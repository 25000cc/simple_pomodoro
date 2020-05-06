(function () {
  "use strict";

  // DOM操作で要素の取得
  let timer = document.getElementById('timer');
  let startStopBtn = document.getElementById('start-stop-btn');
  let count = document.getElementById('setCount');
  let status = document.getElementById('status');
  let tomato = document.getElementById('tomato');

  let startTime;
  let leftTime;
  let timer25; // 25分タイマー
  let timer5; // 5分タイマー
  let setCount = 0; // 現在何セット目かをカウント
  let isRunning = false;
  let witchTimer = 0;
  let isItSet = false;

  startStopBtn.onclick = () => { // ボタンを押した際の処理(一つのボタンでスタートとストップを切り替える)
    if (isRunning === false) { // スタートを押したときの処理
      if (setCount === 0) {
        isItSet = false;
        startTimer25();
      } else {
        setCount++;
        isItSet = true;
        startTimer25();
      }
      isRunning = true;
      startStopBtn.innerHTML = "&#xf04d;"; // 四角ボタンに形を変える
      startTime = Date.now();
    } else { // ストップを押したときの処理
      stopAllTimer();
    }
  }

  /**
   * 25分タイマーを開始、ステータスをWorking timeに更新、トマト画像を赤に差し替え、セットカウント更新
   */
  function startTimer25() {
    timer25 = setInterval(timeCalculation, 20, 1500000, 'timer25');
    if (isItSet === true) {
      setCount--;
      if (setCount === 0) {
        stopAllTimer();
        status.innerHTML = "Good Job";
        return;
      }
    } else {
      setCount++;
    }
    count.innerHTML = ('0' + setCount).slice(-2);
    status.innerHTML = "Working time";
    tomato.src = "images/tomato.png";
    tomato.alt = "赤トマト";
  }

  /**
   * 5分タイマーを開始、ステータスをBreak timeに更新、トマト画像を緑に差し替え
   */
  function startTimer5() {
    timer5 = setInterval(timeCalculation, 20, 300000, 'timer5');
    status.innerHTML = "Break time";
    tomato.src = "images/green-tomato.png";
    tomato.alt = "緑トマト";
  }
  
  /**
   * 25分タイマーを停止、5分タイマーを開始、アラームを鳴らす
   */
  function stopTimer25() {
    clearInterval(timer25);
    startTimer5();
    playSound();
  }

  /**
   * 5分タイマーを停止、25分タイマーを開始、アラームを鳴らす
   */
  function stopTimer5() {
    clearInterval(timer5);
    startTimer25();
    playSound();
  }

  /**
   * 全てのタイマーを停止、ボタン、タイマー、画像、セットカウント、全て初期化
   */
  function stopAllTimer() {
    clearInterval(timer25);
    clearInterval(timer5);
    isRunning = false;
    startStopBtn.innerHTML = "&#xf04b;"; // 三角ボタンに形を変える
    timer.innerText = '25:00.000';
    setCount = 0;
    witchTimer = 0;
    count.innerHTML = '00';
    status.innerHTML = "Let's start";
    tomato.src = "images/tomato.png";
    tomato.alt = "赤トマト";
  }

  /**
   * htmlの残り時間の表示を更新する関数
   * @param {num} leftTime 残り時間
   */
  function updateParagraph(leftTime) {
    leftTime = leftTime / 1000;
    let min = ('0' + Math.floor(leftTime / 60)).slice(-2);
    let sec = ('0' + Math.floor(leftTime % 60)).slice(-2);
    let ms = ('00' + String(leftTime * 1000)).slice(-3);
    timer.innerHTML = min + ':' + sec + '.' + ms;
  }

  /**
   * 残り時間を計算、表示する関数
   * @param {num} timeToCountDown 設定時間
   * @param {string} timerID タイマーID
   */
  function timeCalculation(timeToCountDown, timerID) {
    leftTime = timeToCountDown - (Date.now() - startTime);
    if (leftTime <= 0) { // 残り時間が0になったときの処理
      startTime = Date.now(); // スタートタイムの更新
      if (witchTimer % 2 === 0) { // どちらのタイマーを止めるか分岐
        stopTimer25();
      } else {
        stopTimer5();
      }
      witchTimer++;
      return;
    } else {
      updateParagraph(leftTime);
    }
  }

  let radio1 = document.getElementById('radio1');
  let radio2 = document.getElementById('radio2');
  let radio3 = document.getElementById('radio3');
  let radio4 = document.getElementById('radio4');
  let volumeRange = document.getElementById('volume-range');

  /**
   * アラームを再生
   */
  function playSound() {
    let audioElement = new Audio();
    if (radio1.checked) {
      audioElement.src = "audio/alarm1.mp3";
    } else if (radio2.checked) {
      audioElement.src = "audio/alarm2.mp3";
    } else if (radio3.checked) {
      audioElement.src = "audio/alarm3.mp3";
    } else if (radio4.checked) {
      audioElement.src = "audio/alarm4.mp3";
    } else {
      audioElement.src = "audio/alarm5.mp3";
    }
    audioElement.volume = volumeRange.value / 100;
    audioElement.play();
  }

  // 要素の取得
  let menuIcon = document.getElementById('menu-icon');
  let menu = document.getElementById('menu');
  let nonMenu = document.getElementById('non-menu');
  let menuBack = document.getElementById('menu-back');
  let closeMenuIcon = document.getElementById('close-menu-icon');

  let aboutPomodoro = document.getElementById('about-pomodoro');
  let setCountConfig = document.getElementById('set-count-config');
  let alarmConfig = document.getElementById('alarm-config');
  let darkTheme = document.getElementById('dark-theme');

  let menuContents = document.getElementById('menu-contents');
  let aboutPomodoroMain = document.getElementById('about-pomodoro-main');
  let setCountConfigMain = document.getElementById('set-count-config-main');
  let alarmConfigMain = document.getElementById('alarm-config-main');
  let inputSetText = document.getElementById('input-set-text');
  let inputSetDecision = document.getElementById('input-set-decision');
  let setError = document.getElementById('set-error');
  let previewBtn = document.getElementById('preview-button');


  menuIcon.onclick = () => { // メニュー覧を表示
    menu.classList.add('slide-in');
    nonMenu.style.display = "block";
    menuBack.classList.add('menu-back-fade-in');
  }

  /**
   * メニュー欄を非表示(nonMenu以外にも使うので関数化)
   */
  function closeMenu() {
    menu.classList.remove('slide-in');
    nonMenu.style.display = "none";
    menuBack.classList.remove('menu-back-fade-in');
  }

  /**
   * ×ボタンを表示(setTimeoutに使うため関数化)
   */
  function closeMenuIconShow() {
    closeMenuIcon.classList.add('close-menu-icon-show');
  }

  /**
   * メニューコンテンツを表示、0.4秒後に×ボタンを表示
   */
  function openMenuContents() {
    menuContents.classList.add('slide-in');
    setTimeout(closeMenuIconShow, 400);
  }

  /**
   * メニューコンテンツを非表示
   */
  function closeMenuContents() {
    menuContents.classList.remove('slide-in');
  }

  closeMenuIcon.onclick = () => { // ×ボタンを押した際の処理
    closeMenu();
    closeMenuContents();
    closeMenuIcon.classList.remove('close-menu-icon-show');
  }
  
  nonMenu.onclick = closeMenu;

  aboutPomodoro.onclick = () => { // 「ポモドーロとは」を表示、その他のメニューコンテンツを非表示
    openMenuContents();
    setCountConfigMain.classList.remove('mains-fade-in');
    alarmConfigMain.classList.remove('mains-fade-in');
    aboutPomodoroMain.classList.add('mains-fade-in');
  }

  setCountConfig.onclick = () => { // 「セット数」を表示、その他のメニューコンテンツを非表示
    openMenuContents();
    aboutPomodoroMain.classList.remove('mains-fade-in');
    alarmConfigMain.classList.remove('mains-fade-in');
    setCountConfigMain.classList.add('mains-fade-in');
    inputSetText.value = "";
    setError.innerHTML = "";    
  }

  /**
   * 入力されたセット数を反映
   */
  function setConfig() {
    switch (inputSetText.value) {
      case "":
        setError.innerHTML = "入力されていません";
        break;
      case "0":
        setError.innerHTML = "0以外の数字を入力してください";
        break;
      case "00":
        setError.innerHTML = "0以外の数字を入力してください";
        break;
      default:
        if (inputSetText.value.match(/[^0-9]+/)) {
          setError.innerHTML = "数字を入力してください";
        } else if (inputSetText.value.length > 2) {
          setError.innerHTML = "2桁以下の数字を入力してください";
        } else {
          setCount = inputSetText.value;
          count.innerHTML = ('00' + setCount).slice(-2);
          closeMenuContents();          
          closeMenu();
          setCountConfigMain.classList.remove('mains-fade-in');
          closeMenuIcon.classList.remove('close-menu-icon-show');
          inputSetText.value = "";
          setError.innerHTML = "";
        }
    }
  }
  
  inputSetDecision.onclick = setConfig; // 決定ボタンを押した際の処理

  inputSetText.onkeypress = (e) => { // セット数のtext欄でエンターキーを押した際の処理
    if (e.keyCode === 13) {
      setConfig();
    } else {
      return;
    }
  }

  alarmConfig.onclick = () => { // 「アラームの設定」を表示、その他のメニューコンテンツを非表示
    openMenuContents();
    aboutPomodoroMain.classList.remove('mains-fade-in');
    setCountConfigMain.classList.remove('mains-fade-in');
    alarmConfigMain.classList.add('mains-fade-in');
  }

  previewBtn.onclick = playSound; // プレビューボタンで再生

  let menus = document.getElementById('menus');
  let h1Box = document.getElementsByClassName('h1-box');
  let grayBack = document.getElementsByClassName('gray-back');
  let textContents = document.getElementById('text-contents');
  let soundType = document.getElementsByClassName('sound-type');
  let volume = document.getElementsByClassName('volume');
  let preview = document.getElementsByClassName('preview');
  
  let darkThemeIndex = 0; // ダークテーマのオン・オフを切り替えるための関数

  darkTheme.onclick = () => { // ダークテーマ
    if (darkThemeIndex % 2 === 0) {
      darkTheme.innerHTML = "ライトテーマ";
      document.body.style.backgroundColor = "#1C1C1C";
      menu.style.backgroundColor = "#000";
      menus.style.color = "#F5F5F5";
      menuContents.style.backgroundColor = "#000";
      closeMenuIcon.style.color = "#F5F5F5";
      for (let i = 0; i < h1Box.length; i++) {
        h1Box[i].style.color = "#F5F5F5";
      }
      for (let i = 0; i < grayBack.length; i++) {
        grayBack[i].style.backgroundColor = "#474747";
      }
      textContents.style.color = "#A2A2A2";
      inputSetText.style.backgroundColor = "#000";
      inputSetText.classList.add('darktheme-placeholder');
      inputSetText.classList.remove('light-theme-placeholder');
      inputSetText.style.color = "#7A7A7A"
      soundType[0].style.color = "#F5F5F5";
      volume[0].style.color = "#F5F5F5";
      preview[0].style.color = "#F5F5F5";      
      darkThemeIndex++;
    } else {
      darkTheme.innerHTML = "ダークテーマ";
      document.body.style.backgroundColor = "#F9F9F9";
      menu.style.backgroundColor = "#FFF";
      menus.style.color = "#242424";
      menuContents.style.backgroundColor = "#FFF";
      closeMenuIcon.style.color = "#242424";
      for (let i = 0; i < h1Box.length; i++) {
        h1Box[i].style.color = "#242424";
      }
      for (let i = 0; i < grayBack.length; i++) {
        grayBack[i].style.backgroundColor = "#E8E8E8";
      }
      textContents.style.color = "#7A7A7A";
      inputSetText.style.backgroundColor = "#FFF";
      inputSetText.classList.remove('darktheme-placeholder');
      inputSetText.classList.add('light-theme-placeholder');
      inputSetText.style.color = "#242424"
      soundType[0].style.color = "#7A7A7A";
      volume[0].style.color = "#7A7A7A";
      preview[0].style.color = "#7A7A7A";
      darkThemeIndex = 0;
    }
  }

})();