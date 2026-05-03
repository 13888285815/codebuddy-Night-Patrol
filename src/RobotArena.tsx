import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Robot {
  mesh: THREE.Group;
  hp: number;
  maxHp: number;
  speed: number;
  attackCooldown: number;
  isAttacking: boolean;
  target: Robot | null;
}

export default function RobotArena() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<Robot | null>(null);
  const enemiesRef = useRef<Robot[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const animationIdRef = useRef<number | null>(null);
  const gameStateRef = useRef({ score: 0, wave: 1, gameOver: false });
  const [score, setScore] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [wave, setWave] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const createRobot = (color: number, x: number, z: number, isEnemy: boolean = false): Robot => {
    const group = new THREE.Group();
    
    // 身体
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    group.add(body);
    
    // 头部
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2;
    group.add(head);
    
    // 眼睛
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 2, 0.35);
    group.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 2, 0.35);
    group.add(rightEye);
    
    // 手臂
    const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.7, 1, 0);
    group.add(leftArm);
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.7, 1, 0);
    group.add(rightArm);
    
    // 腿部
    const legGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.3, -0.5, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.3, -0.5, 0);
    group.add(rightLeg);
    
    group.position.set(x, 0, z);
    
    return {
      mesh: group,
      hp: 100,
      maxHp: 100,
      speed: isEnemy ? 0.03 : 0.05,
      attackCooldown: 0,
      isAttacking: false,
      target: null,
    };
  };

  const createArena = () => {
    // 地面
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    sceneRef.current?.add(ground);
    
    // 网格
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x333333);
    sceneRef.current?.add(gridHelper);
    
    // 竞技场墙
    const wallGeometry = new THREE.BoxGeometry(30, 5, 0.5);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
    
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, 2.5, -15);
    sceneRef.current?.add(wall1);
    
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.set(0, 2.5, 15);
    sceneRef.current?.add(wall2);
    
    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.rotation.y = Math.PI / 2;
    wall3.position.set(-15, 2.5, 0);
    sceneRef.current?.add(wall3);
    
    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall4.rotation.y = Math.PI / 2;
    wall4.position.set(15, 2.5, 0);
    sceneRef.current?.add(wall4);
  };

  const createLights = () => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    sceneRef.current?.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    sceneRef.current?.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x00ff00, 1, 50);
    pointLight1.position.set(-10, 10, -10);
    sceneRef.current?.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff0000, 1, 50);
    pointLight2.position.set(10, 10, 10);
    sceneRef.current?.add(pointLight2);
  };

  const spawnEnemy = () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 8 + Math.random() * 5;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    const enemy = createRobot(0xff4444, x, z, true);
    enemy.hp = 50 + gameStateRef.current.wave * 10;
    enemy.maxHp = enemy.hp;
    enemy.target = playerRef.current;
    
    sceneRef.current?.add(enemy.mesh);
    enemiesRef.current.push(enemy);
  };

  const startNewWave = () => {
    gameStateRef.current.wave++;
    setWave(gameStateRef.current.wave);
    
    const enemyCount = 2 + gameStateRef.current.wave;
    for (let i = 0; i < enemyCount; i++) {
      setTimeout(() => spawnEnemy(), i * 500);
    }
  };

  const attack = (attacker: Robot, target: Robot) => {
    if (attacker.attackCooldown > 0) return;
    
    attacker.isAttacking = true;
    attacker.attackCooldown = 30;
    
    const distance = attacker.mesh.position.distanceTo(target.mesh.position);
    if (distance < 3) {
      target.hp -= 20;
      
      if (target === playerRef.current) {
        setPlayerHp(Math.max(0, target.hp));
        if (target.hp <= 0) {
          gameStateRef.current.gameOver = true;
          setGameOver(true);
        }
      } else {
        if (target.hp <= 0) {
          const index = enemiesRef.current.indexOf(target);
          if (index > -1) {
            sceneRef.current?.remove(target.mesh);
            enemiesRef.current.splice(index, 1);
            gameStateRef.current.score += 100;
            setScore(gameStateRef.current.score);
            
            if (enemiesRef.current.length === 0) {
              setTimeout(startNewWave, 2000);
            }
          }
        }
      }
    }
    
    setTimeout(() => {
      attacker.isAttacking = false;
    }, 200);
  };

  const updatePlayer = () => {
    if (!playerRef.current || gameStateRef.current.gameOver) return;
    
    const player = playerRef.current;
    const speed = player.speed;
    
    if (keysRef.current['w'] || keysRef.current['W'] || keysRef.current['ArrowUp']) {
      player.mesh.position.z -= speed;
    }
    if (keysRef.current['s'] || keysRef.current['S'] || keysRef.current['ArrowDown']) {
      player.mesh.position.z += speed;
    }
    if (keysRef.current['a'] || keysRef.current['A'] || keysRef.current['ArrowLeft']) {
      player.mesh.position.x -= speed;
    }
    if (keysRef.current['d'] || keysRef.current['D'] || keysRef.current['ArrowRight']) {
      player.mesh.position.x += speed;
    }
    
    // 限制在竞技场范围内
    player.mesh.position.x = Math.max(-14, Math.min(14, player.mesh.position.x));
    player.mesh.position.z = Math.max(-14, Math.min(14, player.mesh.position.z));
    
    // 找到最近的敌人
    let closestEnemy: Robot | null = null;
    let closestDistance = Infinity;
    
    for (const enemy of enemiesRef.current) {
      const distance = player.mesh.position.distanceTo(enemy.mesh.position);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    }
    
    if (closestEnemy) {
      // 朝向敌人
      player.mesh.lookAt(closestEnemy.mesh.position);
      
      // 攻击
      if (keysRef.current[' '] || keysRef.current['Enter']) {
        attack(player, closestEnemy);
      }
    }
    
    if (player.attackCooldown > 0) {
      player.attackCooldown--;
    }
    
    // 攻击动画
    if (player.isAttacking) {
      player.mesh.children[3].rotation.x = -Math.PI / 2; // 左臂
      player.mesh.children[4].rotation.x = -Math.PI / 2; // 右臂
    } else {
      player.mesh.children[3].rotation.x = 0;
      player.mesh.children[4].rotation.x = 0;
    }
  };

  const updateEnemies = () => {
    if (gameStateRef.current.gameOver) return;
    
    for (const enemy of enemiesRef.current) {
      if (!playerRef.current) continue;
      
      const player = playerRef.current;
      
      // 朝向玩家
      enemy.mesh.lookAt(player.mesh.position);
      
      // 向玩家移动
      const distance = enemy.mesh.position.distanceTo(player.mesh.position);
      if (distance > 2) {
        const direction = new THREE.Vector3();
        direction.subVectors(player.mesh.position, enemy.mesh.position).normalize();
        enemy.mesh.position.add(direction.multiplyScalar(enemy.speed));
      } else {
        attack(enemy, player);
      }
      
      if (enemy.attackCooldown > 0) {
        enemy.attackCooldown--;
      }
      
      // 攻击动画
      if (enemy.isAttacking) {
        enemy.mesh.children[3].rotation.x = -Math.PI / 2;
        enemy.mesh.children[4].rotation.x = -Math.PI / 2;
      } else {
        enemy.mesh.children[3].rotation.x = 0;
        enemy.mesh.children[4].rotation.x = 0;
      }
    }
  };

  const updateCamera = () => {
    if (!playerRef.current || !cameraRef.current) return;
    
    const camera = cameraRef.current;
    const targetX = playerRef.current.mesh.position.x;
    const targetZ = playerRef.current.mesh.position.z + 10;
    const targetY = 8;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    
    camera.lookAt(playerRef.current.mesh.position);
  };

  const animate = () => {
    animationIdRef.current = requestAnimationFrame(animate);
    
    updatePlayer();
    updateEnemies();
    updateCamera();
    
    rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
  };

  const restartGame = () => {
    gameStateRef.current = { score: 0, wave: 1, gameOver: false };
    setScore(0);
    setWave(1);
    setGameOver(false);
    setPlayerHp(100);
    
    // 清除所有敌人
    for (const enemy of enemiesRef.current) {
      sceneRef.current?.remove(enemy.mesh);
    }
    enemiesRef.current = [];
    
    // 重置玩家
    if (playerRef.current) {
      playerRef.current.mesh.position.set(0, 0, 0);
      playerRef.current.hp = 100;
    }
    
    // 生成初始敌人
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        spawnEnemy();
      }
    }, 500);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 10);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    createArena();
    createLights();
    
    const player = createRobot(0x4444ff, 0, 0);
    scene.add(player.mesh);
    playerRef.current = player;
    
    // 生成初始敌人
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        spawnEnemy();
      }
    }, 1000);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
    
    animate();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="robot-arena">
      <div ref={containerRef} className="game-canvas" />
      
      <div className="game-ui">
        <div className="ui-panel">
          <div className="stat">
            <span className="stat-label">得分</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">波次</span>
            <span className="stat-value">{wave}</span>
          </div>
        </div>
        
        <div className="ui-panel health-panel">
          <div className="health-bar">
            <div 
              className="health-fill" 
              style={{ width: `${(playerHp / 100) * 100}%` }}
            />
          </div>
          <span className="health-text">{playerHp}/100</span>
        </div>
        
        <div className="controls-hint">
          <p>WASD/方向键：移动</p>
          <p>空格/回车：攻击</p>
        </div>
      </div>
      
      {gameOver && (
        <div className="game-over-screen">
          <div className="game-over-panel">
            <h2>游戏结束</h2>
            <p>最终得分: {score}</p>
            <p>到达波次: {wave}</p>
            <button className="restart-button" onClick={restartGame}>
              重新开始
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        .robot-arena {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        
        .game-canvas {
          width: 100%;
          height: 100%;
        }
        
        .game-ui {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .ui-panel {
          position: absolute;
          background: rgba(0, 0, 0, 0.7);
          padding: 20px;
          border-radius: 10px;
          color: white;
          pointer-events: auto;
        }
        
        .ui-panel:nth-child(1) {
          top: 20px;
          left: 20px;
          display: flex;
          gap: 30px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-label {
          font-size: 14px;
          color: #aaa;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #4ecdc4;
        }
        
        .health-panel {
          top: 20px;
          right: 20px;
          width: 200px;
        }
        
        .health-bar {
          width: 100%;
          height: 20px;
          background: #333;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .health-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #ee5a5a);
          transition: width 0.3s ease;
        }
        
        .health-text {
          text-align: center;
          font-size: 16px;
        }
        
        .controls-hint {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          padding: 15px 30px;
          border-radius: 10px;
          color: white;
          text-align: center;
        }
        
        .controls-hint p {
          margin: 5px 0;
          font-size: 14px;
        }
        
        .game-over-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }
        
        .game-over-panel {
          background: #222;
          padding: 40px 60px;
          border-radius: 15px;
          text-align: center;
          color: white;
        }
        
        .game-over-panel h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: #ff6b6b;
        }
        
        .game-over-panel p {
          font-size: 18px;
          margin: 10px 0;
        }
        
        .restart-button {
          margin-top: 25px;
          padding: 12px 40px;
          font-size: 18px;
          background: #4ecdc4;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .restart-button:hover {
          background: #45b7b0;
        }
      `}</style>
    </div>
  );
}
