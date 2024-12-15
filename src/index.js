import OBSWebSocket from 'obs-websocket-js';

(async () => {
  const OBS_ADDRESS = 'ws://localhost:4455';
  const OBS_PASSWORD = 'E84F137pdm47Vw1k'; // OBSのWebSocketパスワード
  const obs = new OBSWebSocket();

  try {
    // OBS WebSocketに接続
    await obs.connect(OBS_ADDRESS, OBS_PASSWORD);
    document.getElementById('status').innerText = 'Connected to OBS WebSocket';
    // getCurrentScene(); // 接続後に現在のシーン名を取得
    // getAllScenes();    // 接続後にすべてのシーン名を取得

    
    const sceneList = await obs.call('GetSceneList');
    console.log('すべてのシーン:', sceneList.scenes);

    const sceneListElement = document.getElementById('sceneList');
    sceneListElement.innerHTML = ''; // 以前のリストをクリア
  
    // sceneList.scenes.forEach(scene => {
    //   const li = document.createElement('li');
    //   li.textContent = scene.name; // シーン名をリストに追加
    //   sceneListElement.appendChild(li);
    // });

    if (sceneList && sceneList.scenes && sceneList.scenes.length > 0) {
        displaySceneList(sceneList.scenes); // シーンがある場合のみ表示
      } else {
        document.getElementById('status').innerText = 'シーンが見つかりません';
      }
    
    // ボタンイベントの設定
    document.getElementById('switchScene').addEventListener('click', async () => {
      const sceneName = document.getElementById('sceneName').value;

      if (sceneName) {
        try {
          // シーンを切り替え
          await obs.call('SetCurrentProgramScene', { sceneName });
          document.getElementById('status').innerText = `Switched to: ${sceneName}`;
        } catch (err) {
          document.getElementById('status').innerText = `Error: ${err.message}`;
        }
      } else {
        document.getElementById('status').innerText = 'Please enter a scene name.';
      }
    });
  } catch (error) {
    document.getElementById('status').innerText = `Connection failed: ${error.message}`;
  }
})();

// // 現在のシーン名を取得
// async function getCurrentScene() {
//     try {
//       const currentScene = await obs.call('GetCurrentProgramScene');
//       console.log('現在のシーン:', currentScene.name);
//       displaySceneName(currentScene.name); // 現在のシーン名を画面に表示
//     } catch (error) {
//       console.error('シーン名の取得に失敗しました:', error);
//     }
//   }
  
  // すべてのシーン名を取得
  async function getAllScenes() {
    try {
      const sceneList = await obs.call('GetSceneList');
      console.log('すべてのシーン:', sceneList.scenes);
  
      // 取得したシーン名を画面に表示
      displaySceneList(sceneList.scenes);
    } catch (error) {
      console.error('シーン名の取得に失敗しました:', error);
    }
  }
  
  // 現在のシーン名を画面に表示
  function displaySceneName(sceneName) {
    const sceneElement = document.getElementById('currentSceneName');
    sceneElement.textContent = `現在のシーン: ${sceneName}`;
  }
  
  // シーン名のリストを画面に表示
  function displaySceneList(scenes) {
    const sceneListElement = document.getElementById('sceneList');
    sceneListElement.innerHTML = ''; // 以前のリストをクリア
  
    scenes.forEach(scene => {
        console.log(scene);
      const li = document.createElement('li');
      li.textContent = scene.sceneName; // シーン名をリストに追加
      sceneListElement.appendChild(li);
    });
  }
