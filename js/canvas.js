////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;
var ammoFire = 1;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w, h) {
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;

	canvasW = w;
	canvasH = h;
	stage = new createjs.Stage("gameCanvas");

	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, selectAmmoContainer, selectContainer, mintContainer, contributeContainer, menu4Container, menu5Container, menu6Container, menu7Container, gameContainer, levelContainer, gridContainer, editContainer, objectsContainer, ammoContainer, iconContainer, waveStatusContainer, statusContainer, beginOverlayContainer, stageClearContainer, confirmContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonContinue, buttonClaim, buttonTwitter, buttonSettings, buttonFullscreen, buttonSoundOn, buttonSoundOff, imgFullStamp, itemSelectAmmoFrame, itemSelAmmoCommon, itemSelAmmoRare, itemSelAmmoEpic, itemSelAmmoMythic, buttonPlay, buttonMint, buttonContribute, buttonMenu4, buttonMenu5, buttonMenu6, buttonMenu7, buttonBackDuel, imgDuelBackground, modalDuelFrameOne, modalDuelFrameTwo, modalDuelCU_SC, modalDuelCU_XX, buttonJoinDuelActive, buttonJoinDuelInactive, btnX, btnDiscord, menu4_1, menu4_1_1, menu4_2, menu4_2_1, menu5_1, menu5_1_1, menu5_2, menu5_2_1, menu6_1, menu6_1_1, menu6_2, menu6_2_1, menu7_1, menu7_1_1, menu7_2, menu7_2_1;
var itemPreTower = null;

$.monsters = {};
$.towers = {};
$.arrow = {};
$.selectStage = {};
$.stage = {};
/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	selectAmmoContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	mintContainer = new createjs.Container();
	contributeContainer = new createjs.Container();
	menu4Container = new createjs.Container();
	menu5Container = new createjs.Container();
	menu6Container = new createjs.Container();
	menu7Container = new createjs.Container();
	gameContainer = new createjs.Container();
	levelContainer = new createjs.Container();
	gridContainer = new createjs.Container();
	editContainer = new createjs.Container();
	objectsContainer = new createjs.Container();
	ammoContainer = new createjs.Container();
	iconContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	waveStatusContainer = new createjs.Container();
	beginOverlayContainer = new createjs.Container();
	stageClearContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	resultContainer = new createjs.Container();

	bg = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));

	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW / 2;
	buttonStart.y = canvasH / 2;

	imgDuelBackground = new createjs.Bitmap(loader.getResult('imgDuelBackground'))
	modalDuelFrameOne = new createjs.Bitmap(loader.getResult('itemOverlayStart'));
	centerReg(modalDuelFrameOne)
	createHitarea(modalDuelFrameOne)
	modalDuelFrameTwo = new createjs.Bitmap(loader.getResult('itemOverlayStart'));
	centerReg(modalDuelFrameTwo)
	createHitarea(modalDuelFrameTwo)
	modalDuelCU_SC = new createjs.Bitmap(loader.getResult('modalCU_SC'));
	centerReg(modalDuelCU_SC)
	createHitarea(modalDuelCU_SC)
	modalDuelCU_XX = new createjs.Bitmap(loader.getResult('modalCU_XX'));
	centerReg(modalDuelCU_XX)
	createHitarea(modalDuelCU_XX)
	buttonJoinDuelActive = new createjs.Bitmap(loader.getResult('buttonJoinFightActive'));
	centerReg(buttonJoinDuelActive)
	createHitarea(buttonJoinDuelActive)
	buttonJoinDuelInactive = new createjs.Bitmap(loader.getResult('buttonJoinFightInactive'));
	centerReg(buttonJoinDuelInactive)
	createHitarea(buttonJoinDuelInactive)

	buttonX = new createjs.Bitmap(loader.getResult('btnX'));
	centerReg(buttonX)
	createHitarea(buttonX)

	buttonDiscord = new createjs.Bitmap(loader.getResult('btnDiscord'));
	centerReg(buttonDiscord)
	createHitarea(buttonDiscord)

	buttonJoinDuelActive.x = canvasW / 1.3 - 50
	buttonJoinDuelActive.y = canvasH - 999

	//superpower 
	buttonHeal = new createjs.Bitmap(loader.getResult('btnHeal'));
	centerReg(buttonHeal)
	createHitarea(buttonHeal)
	buttonFreeze = new createjs.Bitmap(loader.getResult('btnFreeze'));
	centerReg(buttonFreeze)
	createHitarea(buttonFreeze)
	buttonDamage = new createjs.Bitmap(loader.getResult('btnDamage'));
	centerReg(buttonDamage)
	createHitarea(buttonDamage)

	buttonHealDisabled = new createjs.Bitmap(loader.getResult('btnHealDisabled'));
	centerReg(buttonHealDisabled)
	createHitarea(buttonHealDisabled)
	buttonFreezeDisabled = new createjs.Bitmap(loader.getResult('btnFreezeDisabled'));
	centerReg(buttonFreezeDisabled)
	createHitarea(buttonFreezeDisabled)
	buttonDamageDisabled = new createjs.Bitmap(loader.getResult('btnDamageDisabled'));
	centerReg(buttonDamageDisabled)
	createHitarea(buttonDamageDisabled)
	buttonHealDisabled.visible = buttonFreezeDisabled.visible = buttonDamageDisabled.visible = false;

	mainContainer.addChild(imgDuelBackground, buttonJoinDuelActive, buttonX, buttonDiscord);

	//select
	buttonBackDuel = new createjs.Bitmap(loader.getResult('buttonBackToDuels'))

	buttonArrowL = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonArrowL);
	buttonArrowR = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonArrowR);
	buttonArrowL.x = canvasW / 100 * 45;
	buttonArrowL.y = canvasH / 100 * 76;
	buttonArrowL.scaleX = -1;
	buttonArrowR.x = canvasW / 100 * 55;
	buttonArrowR.y = canvasH / 100 * 76;

	selectTitleTxt = new createjs.Text();
	selectTitleTxt.font = "45px planerregular";
	selectTitleTxt.color = "#574836";
	selectTitleTxt.textAlign = "center";
	selectTitleTxt.textBaseline = 'alphabetic';
	selectTitleTxt.text = selectTitleText;

	selectTitleTxt.x = canvasW / 2;
	selectTitleTxt.y = canvasH / 100 * 31;

	selectContainer.addChild(selectTitleTxt, buttonArrowL, buttonArrowR, buttonBackDuel);

	var colCount = 1;
	var rowCount = 1;
	var startX = canvasW / 100 * 30;
	var startY = canvasH / 100 * 42;
	var curX = startX;
	var curY = startY;
	var spaceX = 87;
	var spaceY = 90;

	levelButtonLocX = [12.6 / 68, 13 / 68, 16 / 68, 28 / 68, 34 / 68, 42 / 68, 48 / 68, 59 / 68, 42 / 68, 31 / 68];
	levelButtonLocY = [23.5 / 41, 19 / 41, 13 / 41, 12 / 41, 14 / 41, 16 / 41, 19 / 41, 20 / 41, 22 / 41, 24 / 41];
	for (var n = 0; n < levels_arr.length; n++) {
		$.selectStage['icon_' + n] = new createjs.Bitmap(loader.getResult('itemLevel'));
		centerReg($.selectStage['icon_' + n]);

		$.selectStage['iconLock_' + n] = new createjs.Bitmap(loader.getResult('itemLevelLock'));
		centerReg($.selectStage['iconLock_' + n]);

		$.selectStage['iconText_' + n] = new createjs.Text();
		$.selectStage['iconText_' + n].font = "4px commonFont";
		$.selectStage['iconText_' + n].color = "#42B142";
		$.selectStage['iconText_' + n].textAlign = "center";
		$.selectStage['iconText_' + n].textBaseline = 'alphabetic';
		$.selectStage['iconText_' + n].text = n + 1;

		$.selectStage['icon_' + n].x = $.selectStage['iconLock_' + n].x = $.selectStage['iconText_' + n].x = canvasW * levelButtonLocX[n]//curX;
		$.selectStage['icon_' + n].y = $.selectStage['iconLock_' + n].y = canvasH * levelButtonLocY[n]//curY;
		$.selectStage['iconText_' + n].y = canvasH * levelButtonLocY[n] + 13;

		selectContainer.addChild($.selectStage['icon_' + n], $.selectStage['iconText_' + n], $.selectStage['iconLock_' + n]);
	}

	//slect ammo
	itemSelectAmmoFrame = new createjs.Bitmap(loader.getResult('ammoSelAmmoFrame'));
	centerReg(itemSelectAmmoFrame);
	itemSelectAmmoFrame.x = canvasW / 2;
	itemSelectAmmoFrame.y = canvasH / 2;

	itemSelAmmoCommon = new createjs.Bitmap(loader.getResult('ammoSelCommon'));
	centerReg(itemSelAmmoCommon);
	createHitarea(itemSelAmmoCommon);
	itemSelAmmoCommon.x = canvasW / 100 * 25
	itemSelAmmoCommon.y = canvasH / 100 * 60

	itemSelAmmoRare = new createjs.Bitmap(loader.getResult('ammoSelRare'));
	centerReg(itemSelAmmoRare);
	createHitarea(itemSelAmmoRare);
	itemSelAmmoRare.x = canvasW / 100 * 43
	itemSelAmmoRare.y = canvasH / 100 * 60

	itemSelAmmoEpic = new createjs.Bitmap(loader.getResult('ammoSelEpic'));
	centerReg(itemSelAmmoEpic);
	createHitarea(itemSelAmmoEpic);
	itemSelAmmoEpic.x = canvasW / 100 * 60
	itemSelAmmoEpic.y = canvasH / 100 * 60

	itemSelAmmoMythic = new createjs.Bitmap(loader.getResult('ammoSelMythic'));
	centerReg(itemSelAmmoMythic);
	createHitarea(itemSelAmmoMythic);
	itemSelAmmoMythic.x = canvasW / 100 * 77
	itemSelAmmoMythic.y = canvasH / 100 * 60

	// selectAmmoContainer.addChild(itemSelectAmmoFrame, itemSelAmmoCommon, itemSelAmmoRare, itemSelAmmoEpic, itemSelAmmoMythic);

	itemSelAmmoCommon.cursor = "pointer";
	itemSelAmmoRare.cursor = "pointer";
	itemSelAmmoEpic.cursor = "pointer";
	itemSelAmmoMythic.cursor = "pointer";
	itemSelAmmoCommon.addEventListener("click", function (evt) { ammoFire = 1; playSound('soundClick'); goPage('game'); })
	itemSelAmmoRare.addEventListener("click", function (evt) { ammoFire = 1.05; playSound('soundClick'); goPage('game'); })
	itemSelAmmoEpic.addEventListener("click", function (evt) { ammoFire = 1.1; playSound('soundClick'); goPage('game'); })
	itemSelAmmoMythic.addEventListener("click", function (evt) { ammoFire = 1.2; playSound('soundClick'); goPage('game'); })

	//game
	iconMenu = new createjs.Bitmap(loader.getResult('iconMenu'));
	centerReg(iconMenu);
	iconMenuClose = new createjs.Bitmap(loader.getResult('iconMenuClose'));
	centerReg(iconMenuClose);
	iconMenu.visible = iconMenuClose.visible = false;

	itemLove = new createjs.Bitmap(loader.getResult('itemLove'));
	centerReg(itemLove);

	for (n = 0; n < levels_arr.length; n++) {
		$.stage[n] = new createjs.Bitmap(loader.getResult('stage' + n));
		levelContainer.addChild($.stage[n]);
	}

	itemStatus = new createjs.Bitmap(loader.getResult('itemStatus'));

	lifeTxt = new createjs.Text();
	lifeTxt.font = "20px i_shot_the_serifregular";
	lifeTxt.color = "#000";
	lifeTxt.textAlign = "left";
	lifeTxt.textBaseline = 'alphabetic';
	lifeTxt.text = 'x 10';

	resourceTxt = new createjs.Text();
	resourceTxt.font = "20px i_shot_the_serifregular";
	resourceTxt.color = "#000";
	resourceTxt.textAlign = "left";
	resourceTxt.textBaseline = 'alphabetic';
	resourceTxt.text = '100';

	waveTxt = new createjs.Text();
	waveTxt.font = "15px planerregular";
	waveTxt.color = "#000";
	waveTxt.textAlign = "center";
	waveTxt.textBaseline = 'alphabetic';
	waveTxt.text = 'WAVE : 1/30';

	itemGrid = new createjs.Bitmap(loader.getResult('itemGrid'));
	itemMenuBg = new createjs.Bitmap(loader.getResult('itemMenuBg'));
	centerReg(itemMenuBg);
	itemMenuBgSmall = new createjs.Bitmap(loader.getResult('itemMenuBgSmall'));
	centerReg(itemMenuBgSmall);
	itemMenuBg.visible = itemMenuBgSmall.visible = false;

	iconContainer.addChild(itemMenuBg, itemMenuBgSmall, iconMenuClose, iconMenu);

	itemOverlayStart = new createjs.Bitmap(loader.getResult('itemOverlayStart'));

	beginLevelTxt = new createjs.Text();
	beginLevelTxt.font = "45px commonFont";
	beginLevelTxt.color = "#7F56D9";
	beginLevelTxt.textAlign = "center";
	beginLevelTxt.textBaseline = 'alphabetic';
	beginLevelTxt.text = beginLevelTitleText;

	beginMonsterTxt = new createjs.Text();
	beginMonsterTxt.font = "20px poppinsFont";
	beginMonsterTxt.color = "#7F7F7F";
	beginMonsterTxt.textAlign = "center";
	beginMonsterTxt.textBaseline = 'alphabetic';
	beginMonsterTxt.text = beginMonsterText;

	beginTowerTxt = new createjs.Text();
	beginTowerTxt.font = "20px poppinsFont";
	beginTowerTxt.color = "#7F7F7F";
	beginTowerTxt.textAlign = "center";
	beginTowerTxt.textBaseline = 'alphabetic';
	beginTowerTxt.text = beginTowerText;

	beginTowerUpgradeTxt = new createjs.Text();
	beginTowerUpgradeTxt.font = "18px poppinsFont";
	beginTowerUpgradeTxt.color = "#7F7F7F";
	beginTowerUpgradeTxt.textAlign = "center";
	beginTowerUpgradeTxt.textBaseline = 'alphabetic';
	beginTowerUpgradeTxt.text = beginTowerUpgradeText;

	beginLevelTxt.x = beginMonsterTxt.x = beginTowerTxt.x = beginTowerUpgradeTxt.x = canvasW / 2;
	beginLevelTxt.y = canvasH / 100 * 31;
	beginMonsterTxt.y = canvasH / 100 * 39;
	beginTowerTxt.y = canvasH / 100 * 53;
	beginTowerUpgradeTxt.y = canvasH / 100 * 68;

	beginOverlayContainer.addChild(itemOverlayStart, beginLevelTxt, beginMonsterTxt, beginTowerTxt, beginTowerUpgradeTxt);

	for (n = 0; n < monsters_arr.length; n++) {
		var _frameW = monsters_arr[n].width;
		var _frameH = monsters_arr[n].height;

		var _frame = { "regX": monsters_arr[n].regX, "regY": monsters_arr[n].regY, "height": _frameH, "count": 10, "width": _frameW };
		var _animations = { run: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], speed: 1 }, dead: { frames: [9], speed: 1 } };

		monsterData = new createjs.SpriteSheet({
			"images": [loader.getResult('monster' + n).src],
			"frames": _frame,
			"animations": _animations
		});

		$.monsters[n] = new createjs.Sprite(monsterData, "run");
		$.monsters[n].framerate = 15;
		$.monsters[n].x = -100;

		if (monsters_arr[n].ammo.src != undefined) {
			$.monsters['ammo' + n] = new createjs.Bitmap(loader.getResult('monsterAmmo' + n));
			$.monsters['ammo' + n].regX = monsters_arr[n].ammo.regX;
			$.monsters['ammo' + n].regY = monsters_arr[n].ammo.regY;
			$.monsters['ammo' + n].x = -100;
			gameContainer.addChild($.monsters['ammo' + n]);
		}

		gameContainer.addChild($.monsters[n]);

		$.monsters['begin' + n] = new createjs.Sprite(monsterData, "run");
		$.monsters['begin' + n].framerate = 20;
		$.monsters['begin' + n].x = canvasW / 2;
		$.monsters['begin' + n].y = canvasH / 100 * 48;
		$.monsters['begin' + n].gotoAndStop(1);
		beginOverlayContainer.addChild($.monsters['begin' + n]);
	}



	for (n = 0; n < towers_arr.length; n++) {
		if (n == 0) {
			$.towers[n] = new createjs.Bitmap(loader.getResult('tower' + n));
			$.towers[n].regX = towers_arr[n].image.regX;
			$.towers[n].regY = towers_arr[n].image.regY;
			$.towers[n].x = -500;

			$.towers['ammo' + n] = new createjs.Bitmap(loader.getResult('towerAmmo' + n));
			$.towers['ammo' + n].regX = towers_arr[n].ammo.regX;
			$.towers['ammo' + n].regY = towers_arr[n].ammo.regY;
			$.towers['ammo' + n].x = -500;
		} else {
			var _frameTower = { "regX": towers_arr[n].image.regX, "regY": towers_arr[n].image.regY, "height": 140, "count": 10, "width": 120 };
			var _animationsTower = { run: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], speed: 1 }, dead: { frames: [9], speed: 1 } };
			towerData = new createjs.SpriteSheet({
				"images": [loader.getResult('tower' + n).src],
				"frames": _frameTower,
				"animations": _animationsTower
			});
			$.towers[n] = new createjs.Sprite(towerData, "run");
			$.towers[n].framerate = 7;
			$.towers[n].x = -500;

			var _frameAmmo = { "regX": towers_arr[n].ammo.regX, "regY": towers_arr[n].ammo.regY, "height": 70, "count": 10, "width": 60 };
			var _animationsAmmo = { run: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], speed: 1 }, dead: { frames: [9], speed: 1 } };
			towerAmmoData = new createjs.SpriteSheet({
				"images": [loader.getResult('towerAmmo' + n).src],
				"frames": _frameAmmo,
				"animations": _animationsAmmo
			});
			$.towers['ammo' + n] = new createjs.Sprite(towerAmmoData, "run");
			$.towers['ammo' + n].framerate = 20;
			$.towers['ammo' + n].x = -500;

		}

		$.towers['icon' + n] = new createjs.Bitmap(loader.getResult('towerIcon' + n));
		$.towers['icon' + n].regX = towers_arr[n].icon.regX;
		$.towers['icon' + n].regY = towers_arr[n].icon.regY;
		$.towers['icon' + n].resource = towers_arr[n].resource;
		$.towers['icon' + n].life = towers_arr[n].life;
		$.towers['icon' + n].x = -500;

		$.towers['iconDisable' + n] = new createjs.Bitmap(loader.getResult('towerIconDisable' + n));
		$.towers['iconDisable' + n].regX = towers_arr[n].icon.regX;
		$.towers['iconDisable' + n].regY = towers_arr[n].icon.regY;
		$.towers['iconDisable' + n].x = -500;



		gameContainer.addChild($.towers[n], $.towers['ammo' + n]);
		iconContainer.addChild($.towers['icon' + n], $.towers['iconDisable' + n]);

		if (towers_arr[n].upgrade != undefined) {
			if (towers_arr[n].upgrade.length > 0) {
				for (var u = 0; u < towers_arr[n].upgrade.length; u++) {
					
					var _frameUpgradeTower = { "regX": towers_arr[n].upgrade[u].image.regX, "regY": towers_arr[n].upgrade[u].image.regY, "height": 70, "count": 10, "width": 60 };
					var _animationsUpgradeTower = { run: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], speed: 1 }, dead: { frames: [9], speed: 1 } };
					towerData = new createjs.SpriteSheet({
						"images": [loader.getResult('tower' + n + '_' + u).src],
						"frames": _frameUpgradeTower,
						"animations": _animationsUpgradeTower
					});

					$.towers[n + '_' + u] = new createjs.Sprite(towerData, "run");
					$.towers[n + '_' + u].framerate = 20;
					$.towers[n + '_' + u].x = -500;

					$.towers['icon' + n + '_' + u] = new createjs.Bitmap(loader.getResult('towerIcon' + n + '_' + u));
					$.towers['icon' + n + '_' + u].regX = towers_arr[n].upgrade[u].icon.regX;
					$.towers['icon' + n + '_' + u].regY = towers_arr[n].upgrade[u].icon.regY;
					$.towers['icon' + n + '_' + u].resource = towers_arr[n].upgrade[u].resource;
					$.towers['icon' + n + '_' + u].life = towers_arr[n].upgrade[u].life;
					$.towers['icon' + n + '_' + u].x = -500;

					$.towers['iconDisable' + n + '_' + u] = new createjs.Bitmap(loader.getResult('towerIconDisable' + n + '_' + u));
					$.towers['iconDisable' + n + '_' + u].regX = towers_arr[n].upgrade[u].icon.regX;
					$.towers['iconDisable' + n + '_' + u].regY = towers_arr[n].upgrade[u].icon.regY;
					$.towers['iconDisable' + n + '_' + u].x = -500;

					var _frameUpgradeAmmo = { "regX": towers_arr[n].upgrade[u].ammo.regX, "regY": towers_arr[n].upgrade[u].ammo.regY, "height": 70, "count": 10, "width": 60 };
					var _animationsUpgradeAmmo = { run: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], speed: 1 }, dead: { frames: [9], speed: 1 } };
					towerAmmoData = new createjs.SpriteSheet({
						"images": [loader.getResult('towerAmmo' + n).src],
						"frames": _frameUpgradeAmmo,
						"animations": _animationsUpgradeAmmo
					});
					$.towers['ammo' + n + '_' + u] = new createjs.Sprite(towerAmmoData, "run");
					$.towers['ammo' + n + '_' + u].framerate = 20;
					$.towers['ammo' + n + '_' + u].x = -500;

					gameContainer.addChild($.towers[n + '_' + u], $.towers['ammo' + n + '_' + u]);
					iconContainer.addChild($.towers['icon' + n + '_' + u], $.towers['iconDisable' + n + '_' + u]);
				}
			}
		}

		var upgradebleTower = false;
		if (towers_arr[n].upgrade != undefined) {
			if (towers_arr[n].upgrade.length > 0) {
				upgradebleTower = true;
				$.towers['begin' + n] = $.towers[n + '_' + 0].clone();
				// $.towers['begin' + n].regX = towers_arr[n].image.regX;
				// $.towers['begin' + n].regY = towers_arr[n].image.regY;
				$.towers['begin' + n].canUpgrade = true;
			}
		}
		if (!upgradebleTower) {
			$.towers['begin' + n] = $.towers[n].clone();
		}

		$.towers['begin' + n].x = canvasW / 2;
		$.towers['begin' + n].y = canvasH / 100 * 61;
		$.towers['begin' + n].scaleX = 0.5
		$.towers['begin' + n].scaleY = 0.5
		beginOverlayContainer.addChild($.towers['begin' + n]);
	}

	itemArrowGuide = new createjs.Bitmap(loader.getResult('itemArrowGuide'));
	centerReg(itemArrowGuide);
	itemArrowGuide.visible = false;

	itemStageOverlay = new createjs.Bitmap(loader.getResult('itemStageOverlay'));

	stageTitleTxt = new createjs.Text();
	stageTitleTxt.font = "45px commonFont";
	stageTitleTxt.color = "#652312";
	stageTitleTxt.textAlign = "center";
	stageTitleTxt.textBaseline = 'alphabetic';
	stageTitleTxt.text = 'STAGE 1 COMPLETE';
	stageTitleTxt.x = canvasW / 2;
	stageTitleTxt.y = canvasH / 100 * 52;

	stageClearContainer.addChild(itemStageOverlay, stageTitleTxt);

	itemOverlay = new createjs.Bitmap(loader.getResult('itemOverlay'));

	itemConfirm = new createjs.Bitmap(loader.getResult('buttonBlank'));
	centerReg(itemConfirm);
	itemConfirm.x = canvasW / 100 * 40;
	itemConfirm.y = canvasH / 100 * 60;

	itemCancel = new createjs.Bitmap(loader.getResult('buttonBlank'));
	centerReg(itemCancel);
	itemCancel.x = canvasW / 100 * 60;
	itemCancel.y = canvasH / 100 * 60;

	confirmTxt = new createjs.Text();
	confirmTxt.font = "32px commonFont";
	confirmTxt.lineHeight = 60;
	confirmTxt.color = "#000000";
	confirmTxt.textAlign = "center";
	confirmTxt.textBaseline = 'alphabetic';
	confirmTxt.text = quitText;
	confirmTxt.x = itemConfirm.x;
	confirmTxt.y = itemConfirm.y + 14;

	cancelTxt = new createjs.Text();
	cancelTxt.font = "32px commonFont";
	cancelTxt.color = "#000000";
	cancelTxt.textAlign = "center";
	cancelTxt.textBaseline = 'alphabetic';
	cancelTxt.text = stayText;
	cancelTxt.x = itemCancel.x;
	cancelTxt.y = itemCancel.y + 14;

	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "26px poppinsFont";
	confirmMessageTxt.color = "#000000";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline = 'alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW / 2;
	confirmMessageTxt.y = canvasH / 100 * 45;

	confirmContainer.addChild(itemOverlay, itemConfirm, itemCancel, confirmMessageTxt, confirmTxt, cancelTxt);
	confirmContainer.visible = false;

	waveStatusTxt = new createjs.Text();
	waveStatusTxt.font = "35px commonFont";
	waveStatusTxt.color = "#fff";
	waveStatusTxt.textAlign = "center";
	waveStatusTxt.textBaseline = 'alphabetic';
	waveStatusTxt.text = '';

	waveStatusShadowTxt = new createjs.Text();
	waveStatusShadowTxt.font = "35px commonFont";
	waveStatusShadowTxt.color = "#484c42";
	waveStatusShadowTxt.textAlign = "center";
	waveStatusShadowTxt.textBaseline = 'alphabetic';
	waveStatusShadowTxt.text = '';

	waveStatusTxt.x = canvasW / 2;
	waveStatusShadowTxt.x = waveStatusTxt.x;

	waveStatusContainer.addChild(waveStatusShadowTxt, waveStatusTxt);

	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	centerReg(itemResult);
	itemResult.x = canvasW / 2;
	itemResult.y = canvasH / 2;

	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "50px commonFont";
	resultTitleTxt.color = "#7F56D9";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline = 'alphabetic';
	resultTitleTxt.text = 'LEVEL 1 COMPLETE';
	resultTitleTxt.x = canvasW / 1.4;
	resultTitleTxt.y = canvasH / 115 * 34;


	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	buttonFacebook.x = canvasW / 100 * 44;
	buttonTwitter.x = canvasW / 113 * 71;
	buttonWhatsapp.x = canvasW / 100 * 56;
	buttonTwitter.y = canvasH / 80 * 72.5;

	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	createHitarea(buttonContinue);
	buttonContinue.x = canvasW / 1.13;
	buttonContinue.y = canvasH / 80 * 72.5;

	buttonClaim = new createjs.Bitmap(loader.getResult('buttonClaim'));
	centerReg(buttonClaim);
	createHitarea(buttonClaim);
	buttonClaim.x = canvasW / 1.13;
	buttonClaim.y = canvasH / 80 * 72.5;



	imgFullStamp = new createjs.Bitmap(loader.getResult('imgFullStamp'));
	imgFullStamp.scaleX = 0.65;
	imgFullStamp.scaleY = 0.65;
	centerReg(imgFullStamp);
	createHitarea(imgFullStamp);
	imgFullStamp.x = canvasW / 2;
	imgFullStamp.y = canvasH / 100 * 55;

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "25px commonFont";
	resultShareTxt.color = "#7F56D9";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline = 'alphabetic';
	resultShareTxt.text = shareText;
	resultShareTxt.x = buttonTwitter.x - 100;
	resultShareTxt.y = buttonTwitter.y + 10;

	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "20px poppinsFont";
	resultScoreTxt.color = "#7F7F7F";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline = 'alphabetic';
	resultScoreTxt.text = '1500PTS';
	resultScoreTxt.x = canvasW / 100 * 51

	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
	centerReg(buttonMusicOn);
	buttonMusicOff = new createjs.Bitmap(loader.getResult('buttonMusicOff'));
	centerReg(buttonMusicOff);
	buttonMusicOff.visible = false;

	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);

	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonMusicOn);
	createHitarea(buttonMusicOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);//buttonMusicOn, buttonMusicOff, 
	optionsContainer.visible = false;

	if (guide) {
		guideline = new createjs.Shape();
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
	}

	gameContainer.addChild(itemArrowGuide, levelContainer, editContainer, gridContainer, itemGrid, objectsContainer, ammoContainer, waveStatusContainer, iconContainer, beginOverlayContainer, stageClearContainer, statusContainer);
	stageClearContainer.visible = false;
	statusContainer.addChild(itemStatus, lifeTxt, resourceTxt, waveTxt, itemLove);
	resultContainer.addChild(itemResult, resultTitleTxt, resultScoreTxt, buttonContinue, buttonClaim);
	gameContainer.addChild(buttonHeal, buttonFreeze, buttonDamage, buttonHealDisabled, buttonFreezeDisabled, buttonDamageDisabled);

	if (shareEnable) {
		resultContainer.addChild(buttonTwitter, imgFullStamp);
	}
	//mint
	mintBackground = new createjs.Bitmap(loader.getResult('pageMint'));

	mintContainer.addChild(mintBackground)
	//contribute
	contributeBackground = new createjs.Bitmap(loader.getResult('pageContribute'));

	buttonPlay = new createjs.Bitmap(loader.getResult('buttonPlay'));
	buttonMint = new createjs.Bitmap(loader.getResult('buttonMint'));
	buttonContribute = new createjs.Bitmap(loader.getResult('buttonContribute'));
	buttonMenu4 = new createjs.Bitmap(loader.getResult('buttonMenu4'));
	menu4_1 = new createjs.Bitmap(loader.getResult('menu4_1'));
	menu4_1_1 = new createjs.Bitmap(loader.getResult('menu4_1_1'));
	menu4_2 = new createjs.Bitmap(loader.getResult('menu4_2'));
	menu4_2_1 = new createjs.Bitmap(loader.getResult('menu4_2_1'));

	buttonMenu5 = new createjs.Bitmap(loader.getResult('buttonMenu5'));
	menu5_1 = new createjs.Bitmap(loader.getResult('menu5_1'));
	menu5_1_1 = new createjs.Bitmap(loader.getResult('menu5_1_1'));
	menu5_2 = new createjs.Bitmap(loader.getResult('menu5_2'));
	menu5_2_1 = new createjs.Bitmap(loader.getResult('menu5_2_1'));

	buttonMenu6 = new createjs.Bitmap(loader.getResult('buttonMenu6'));
	menu6_1 = new createjs.Bitmap(loader.getResult('menu6_1'));
	menu6_1_1 = new createjs.Bitmap(loader.getResult('menu6_1_1'));
	menu6_2 = new createjs.Bitmap(loader.getResult('menu6_2'));
	menu6_2_1 = new createjs.Bitmap(loader.getResult('menu6_2_1'));

	buttonMenu7 = new createjs.Bitmap(loader.getResult('buttonMenu7'));
	menu7_1 = new createjs.Bitmap(loader.getResult('menu7_1'));
	menu7_1_1 = new createjs.Bitmap(loader.getResult('menu7_1_1'));
	menu7_2 = new createjs.Bitmap(loader.getResult('menu7_2'));
	menu7_2_1 = new createjs.Bitmap(loader.getResult('menu7_2_1'));

	centerReg(buttonPlay);
	createHitarea(buttonPlay);
	centerReg(buttonMint);
	createHitarea(buttonMint);
	centerReg(buttonContribute);
	createHitarea(buttonContribute);
	centerReg(buttonMenu4);
	createHitarea(buttonMenu4);
	centerReg(menu4_1);
	createHitarea(menu4_1);
	centerReg(menu4_1_1);
	createHitarea(menu4_1_1);
	centerReg(menu4_2);
	createHitarea(menu4_2);
	centerReg(menu4_2_1);
	createHitarea(menu4_2_1);

	centerReg(buttonMenu5);
	createHitarea(buttonMenu5);
	centerReg(menu5_1);
	createHitarea(menu5_1);
	centerReg(menu5_1_1);
	createHitarea(menu5_1_1);
	centerReg(menu5_2);
	createHitarea(menu5_2);
	centerReg(menu5_2_1);
	createHitarea(menu5_2_1);

	centerReg(buttonMenu6);
	createHitarea(buttonMenu6);
	centerReg(menu6_1);
	createHitarea(menu6_1);
	centerReg(menu6_1_1);
	createHitarea(menu6_1_1);
	centerReg(menu6_2);
	createHitarea(menu6_2);
	centerReg(menu6_2_1);
	createHitarea(menu6_2_1);

	centerReg(buttonMenu7);
	createHitarea(buttonMenu7);
	centerReg(menu7_1);
	createHitarea(menu7_1);
	centerReg(menu7_1_1);
	createHitarea(menu7_1_1);
	centerReg(menu7_2);
	createHitarea(menu7_2);
	centerReg(menu7_2_1);
	createHitarea(menu7_2_1);


	contributeContainer.addChild(contributeBackground)

	menu4_1.x = canvasW / 2.14
	menu4_1.y = 409
	menu4_1_1.x = canvasW / 1.16
	menu4_1_1.y = 645
	menu4_2.x = canvasW / 1.6
	menu4_2.y = 400
	menu4_2_1.x = canvasW / 1.6
	menu4_2_1.y = 480

	menu5_1.x = canvasW / 2.14
	menu5_1.y = 409
	menu5_1_1.x = canvasW / 4.62
	menu5_1_1.y = 590
	menu5_2.x = canvasW / 1.9
	menu5_2.y = 409
	menu5_2_1.x = canvasW / 1.9
	menu5_2_1.y = 655

	menu6_1.x = canvasW / 2.14
	menu6_1.y = 409
	menu6_1_1.x = canvasW / 1.98
	menu6_1_1.y = 650
	menu6_2.x = canvasW / 1.9
	menu6_2.y = 372
	menu6_2_1.x = canvasW / 1.9
	menu6_2_1.y = 585

	menu7_1.x = canvasW / 2.14
	menu7_1.y = 409
	menu7_1_1.x = canvasW / 3.12
	menu7_1_1.y = 592
	menu7_2.x = canvasW / 1.9
	menu7_2.y = 409
	menu7_2_1.x = canvasW / 1.9
	menu7_2_1.y = 635



	menu4Container.addChild(menu4_1, menu4_1_1)
	menu5Container.addChild(menu5_1, menu5_1_1)
	menu6Container.addChild(menu6_1, menu6_1_1)
	menu7Container.addChild(menu7_1, menu7_1_1)

	canvasContainer.addChild(bg, mainContainer, selectAmmoContainer, selectContainer, gameContainer, mintContainer, contributeContainer, menu4Container, menu5Container, menu6Container, menu7Container, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline, buttonPlay, buttonMint, buttonContribute, buttonMenu4, buttonMenu5, buttonMenu6, buttonMenu7, menu4_2, menu4_2_1, menu5_2, menu5_2_1, menu6_2, menu6_2_1, menu7_2, menu7_2_1);
	stage.addChild(canvasContainer);

	resizeCanvas();
}

/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas() {
	if (canvasContainer != undefined) {
		modalDuelFrameOne.x = canvasW / 7 * 2 + offset.x / 9
		modalDuelFrameOne.y = canvasH - offset.y - canvasH / 3
		modalDuelCU_XX.x = canvasW / 7 * 2 + offset.x / 9
		modalDuelCU_XX.y = canvasH - offset.y - canvasH / 3 - 50
		modalDuelFrameTwo.x = canvasW - canvasW / 7 * 2 - offset.x / 9
		modalDuelFrameTwo.y = canvasH - offset.y - canvasH / 3
		modalDuelCU_SC.x = canvasW - canvasW / 7 * 2 - offset.x / 9
		modalDuelCU_SC.y = canvasH - offset.y - canvasH / 3 - 50
		buttonJoinDuelInactive.x = canvasW - canvasW / 7 * 2 - offset.x / 2
		buttonJoinDuelInactive.y = canvasH - offset.y - canvasH / 3 + 50
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		buttonX.x = (canvasW - offset.x) - 110;
		buttonX.y = offset.y + 66;
		buttonDiscord.x = (canvasW - offset.x) - 60;
		buttonDiscord.y = offset.y + 65;
		buttonFreeze.x = (canvasW - offset.x) - 50;
		buttonFreeze.y = offset.y + 350;
		buttonDamage.x = (canvasW - offset.x) - 50;
		buttonDamage.y = offset.y + 420;
		buttonHeal.x = (canvasW - offset.x) - 50;
		buttonHeal.y = offset.y + 490;
		buttonFreezeDisabled.x = (canvasW - offset.x) - 50;
		buttonFreezeDisabled.y = offset.y + 350;
		buttonDamageDisabled.x = (canvasW - offset.x) - 50;
		buttonDamageDisabled.y = offset.y + 420;
		buttonHealDisabled.x = (canvasW - offset.x) - 50;
		buttonHealDisabled.y = offset.y + 490;
		itemStatus.x = offset.x + 20;
		itemStatus.y = buttonSettings.y - buttonSettings.image.naturalHeight / 2
		buttonBackDuel.x = offset.x + 20;
		buttonBackDuel.y = offset.y - buttonPlay.image.naturalHeight / 2 + 45;
		lifeTxt.x = itemStatus.x + 40;
		lifeTxt.y = itemStatus.y + 25;
		resourceTxt.x = itemStatus.x + 120;
		resourceTxt.y = itemStatus.y + 25;
		waveTxt.x = itemStatus.x + 88;
		waveTxt.y = itemStatus.y + 53;
		itemLove.x = itemStatus.x + 25;
		itemLove.y = itemStatus.y + 19;
		waveStatusTxt.y = offset.y + 35;
		waveStatusShadowTxt.y = waveStatusTxt.y + 3;
		iconMenu.x = canvasW - (offset.x + 50);
		iconMenu.y = canvasH - (offset.y + 50);
		iconMenuClose.x = iconMenu.x;
		iconMenuClose.y = iconMenu.y;
		buttonPlay.x = offset.x + 55;
		buttonMint.x = offset.x + 55;
		buttonContribute.x = offset.x + 60;
		buttonMenu4.x = offset.x + 55;
		buttonMenu5.x = offset.x + 55;
		buttonMenu6.x = offset.x + 55;
		buttonMenu7.x = offset.x + 55;
		buttonPlay.y = offset.y + 390;
		buttonContribute.y = offset.y + 125
		buttonMint.y = offset.y + 275;
		buttonMenu4.y = offset.y + 200;
		buttonMenu5.y = offset.y + 485;
		buttonMenu6.y = offset.y + 565;
		buttonMenu7.y = offset.y + 645;

		var distanceNum = 60;
		var nextCount = 0;
		if (curPage != 'game') {
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
				nextCount = 2;
			} else {
				nextCount = 1;
			}

			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);//buttonSettings.y+(distanceNum*(nextCount+1));
		} else {
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
				nextCount = 2;
			} else {
				nextCount = 1;
			}

			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y + (distanceNum * 2);//buttonSettings.y+(distanceNum*(nextCount+1));

			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y + (distanceNum * (nextCount + 1));//buttonSettings.y+(distanceNum*(nextCount+2));
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
	stage.autoClear = true;
	stage.removeAllChildren();
	stage.update();
	createjs.Ticker.removeEventListener("tick", tick);
	createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
	obj.regX = obj.image.naturalWidth / 2;
	obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}