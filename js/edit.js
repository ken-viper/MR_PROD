////////////////////////////////////////////////////////////
// EDIT PUZZLES
////////////////////////////////////////////////////////////
var edit = {show:true, option:'', edit:'', default:[], hover:[], path:[]};
var gridHoverColour = '#000';
var gridPathColour = '#36D900';
var gridDefaultColour = '#FF7F00';

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	 $.editor.enable = true;
});

function loadEditPage(){
	jQuery.ajax({ 
		 url: "editTools.html", dataType: "html" 
	}).done(function( responseHtml ) {
		$("body").prepend(responseHtml);
		buildEditButtons();
		buildEditCanvas();
		$('#editWrapper').show();
		toggleEditOption();
		reloadEditLevel(true);
		statusContainer.visible = levelContainer.visible = false;
		beginOverlayContainer.alpha = 0;
		buttonExit.visible=false;
	});
}

function buildEditButtons(){
	$('#toggleShowOption').click(function(){
		toggleShowOption();
	});
	
	//levels
	buildLevelDD();
	$("#levellist").change(function() {
		if($(this).val() != ''){
			gameData.levelNum = Number($(this).val());
			toggleEditOption();
			reloadEditLevel(true);
		}
	});
	
	$('#prevLevel').click(function(){
		toggleLevel(false);
	});
	
	$('#nextLevel').click(function(){
		toggleLevel(true);
	});
	
	$('#moveLevelUp').click(function(){
		actionLevel('moveup');
	});
	
	$('#moveLevelDown').click(function(){
		actionLevel('movedown');
	});
	
	$('#addNewLevel').click(function(){
		actionLevel('new');
	});
	
	$('#removeLevel').click(function(){
		actionLevel('remove');
	});
	
	//option
	$('#editLevel').click(function(){
		toggleEditOption('level');
	});
	
	$('#editPath').click(function(){
		toggleEditOption('path');
	});
	
	$('#editWaves').click(function(){
		toggleEditOption('wave');
	});
	
	$('#editTower').click(function(){
		toggleEditOption('tower');
	});
	
	$('#testPlay').click(function(){
		toggleEditOption('play');
	});
	
	$('#stopTestPlay').click(function(){
		toggleEditOption('stop');
	});
	
	$('#generateArray').click(function(){
		generateArray();
	});
	
	//level
	$('#updateLevel').click(function(){
		updateLevelData();
	});
	
	$('#doneLevel').click(function(){
		toggleEditOption();
	});
	
	//path
	$("#pathlist").change(function() {
		if($(this).val() != ''){
			if(Number($(this).val()) != $.editor.pathNum){
				$.editor.pathNum = Number($(this).val());
				$('#waveValue').val('');
				$('#waveDelay').val('');
				$('#waveSpace').val('');
				$('#waveSpeed').val('');
				$('#removeWave, #updateWave').hide();
				
				buildWaveDD();
				reloadEditLevel(false);
			}
		}
	});
	
	$('#prevPath').click(function(){
		togglePath(false);
	});
	
	$('#nextPath').click(function(){
		togglePath(true);
	});
	
	$('#addNewPath').click(function(){
		actionPath('new');
	});
	
	$('#removePath').click(function(){
		actionPath('remove');
	});
	
	$('#doneWayPath').click(function(){
		toggleEditPathWay();
		reloadEditLevel(false);
	});
	
	$('#editWayStart').click(function(){
		toggleEditPathWay('connect');
	});
	
	$('#editWayClear').click(function(){
		toggleEditPathWay('clear');
	});
	
	$('#donePath').click(function(){
		toggleEditOption();
	});
	
	//wave	
	$("#wavelist").change(function() {
		if($(this).val() != ''){
			$.editor.waveNum = Number($(this).val());
			$('#waveValue').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].list);
			$('#waveDelay').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].delay);
			$('#waveSpace').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].space);
			$('#waveSpeed').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].speed);
			$('#removeWave, #updateWave').show();
		}
	});
	
	$("#wavelist").focus(function() {
		if($(this).val() != ''){
			$.editor.waveNum = Number($(this).val());
			$('#waveValue').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].list);
			$('#waveDelay').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].delay);
			$('#waveSpace').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].space);
			$('#waveSpeed').val(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].speed);
			$('#removeWave, #updateWave').show();
		}
	});
	
	$('#moveUp').click(function(){
		swapWave(false);
	});
	
	$('#moveDown').click(function(){
		swapWave(true);
	});
	
	$('#addNewWave').click(function(){
		actionWave('new');
	});
	
	$('#removeWave').click(function(){
		actionWave('remove');
	});
	
	$('#updateWave').click(function(){
		updateWaveData();
	});
	
	$('#doneWave').click(function(){
		toggleEditOption();
	});
	
	//tower
	$("#towerlist").change(function() {
		if($(this).val() != ''){
			if(Number($(this).val()) != $.editor.towerNum){
				$.editor.towerUpgradeNum = -1;
				$.editor.towerNum = Number($(this).val());
				if(levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum) != -1){
					$('#towerEnable').prop("selectedIndex", 1);
				}else{
					$('#towerEnable').prop("selectedIndex", 0);	
				}
				$('#editTowerUpdateWrapper').show();
				buildTowerUpgradeDD();
			}
		}
	});
	
	$("#towerupgradelist").change(function() {
		if($(this).val() != ''){
			if(Number($(this).val()) != $.editor.towerUpgradeNum){
				var towerArrayIndex = levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum);
				var towerUpgradeNum = Number(levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex]);
				$.editor.towerUpgradeNum = Number($(this).val());
				
				if($.editor.towerUpgradeNum <= towerUpgradeNum){
					$('#towerEnable').prop("selectedIndex", 1);
				}else{
					$('#towerEnable').prop("selectedIndex", 0);	
				}
				$('#editTowerUpdateWrapper').show();
			}
		}
	});
	
	$('#updateTower').click(function(){
		updateTowerData();
	});
	
	$('#doneTower').click(function(){
		toggleEditOption();
	});
}

 /*!
 * 
 * TOGGLE DISPLAY OPTION - This is the function that runs to toggle display option
 * 
 */
 
function toggleShowOption(){
	if(edit.show){
		edit.show = false;
		$('#editOption').hide();
		$('#toggleShowOption').val('Show Edit Option');
	}else{
		edit.show = true;
		$('#editOption').show();
		$('#toggleShowOption').val('Hide Edit Option');
	}
}

 /*!
 * 
 * TOGGLE EDIT OPTIONS - This is the function that runs to toggle edit options
 * 
 */
function toggleEditOption(con){
	edit.option = con;
	edit.edit = '';
	$.editor.pathNum = -1;
	
	$('#actionWrapper').hide();
	$('#playWrapper').hide();
	$('#editLevelWrapper').hide();
	$('#editPathWrapper').hide();
	$('#editWavesWrapper').hide();
	$('#editTowerWrapper').hide();
	$('#playWrapper').hide();
	
	if(con == 'level'){
		$('#editLevelWrapper').show();
		$('#levelImage').val(levels_arr[gameData.levelNum].level.src);
		$('#levelResource').val(levels_arr[gameData.levelNum].level.resource);
		$('#levelLife').val(levels_arr[gameData.levelNum].level.life);
		
	}else if(con == 'path'){
		$('#editPathWrapper').show();
		$('#editPathSelectWrapper').show();
		$('#editPathWayWrapper').show();
		$('#editWayWrapper').hide();
		$("#selectPathContent").detach().appendTo('#selectPath');
		
		$.editor.pathNum = 0;
		buildPathDD();
	}else if(con == 'wave'){
		$('#editWavesWrapper').show();
		$('#removeWave, #updateWave').hide();
		$("#selectPathContent").detach().appendTo('#selectWavePath');
		
		$.editor.pathNum = 0;
		$.editor.waveNum = 0;
		buildPathDD();
		buildWaveDD();
	}else if(con == 'tower'){
		$('#editTowerWrapper').show();
		$('#editTowerUpdateWrapper').hide();
		
		$.editor.towerUpgradeNum = -1;
		buildTowerDD();
	}else if(con == 'play'){
		$('#playWrapper').show();
		toggleGamePlay(true);
	}else if(con == 'stop'){
		toggleGamePlay(false);
		toggleEditOption();
	}else{
		$('#actionWrapper').show();
	}
	
	reloadEditLevel(false);
}

 /*!
 * 
 * BUILD EDIT CANVAS - This is the function that runs to build edit canvas
 * 
 */
var gridEnter;
var gridExit;
var editWayContainer, editToolContainer, editLevelContainer;
$.editObj = {};

function buildEditCanvas(){
	editWayContainer = new createjs.Container();
	editToolContainer = new createjs.Container();
	editLevelContainer = new createjs.Container();
	
	for(var r = 0; r < gridData.row; r++){
		edit.default[r] = [];
		edit.hover[r] = [];
		edit.path[r] = [];
		
		for(var c = 0; c < gridData.column; c++){
			var newDefaultShape = new createjs.Shape();	
			newDefaultShape.graphics.beginFill(gridDefaultColour).drawRect(-(gridData.width/2), -(gridData.height/2), (gridData.width), (gridData.height));
			
			var newPathShape = new createjs.Shape();	
			newPathShape.graphics.beginFill(gridPathColour).drawRect(-(gridData.width/2), -(gridData.height/2), (gridData.width), (gridData.height));
			
			var newHoverShape = new createjs.Shape();	
			newHoverShape.graphics.beginFill(gridHoverColour).drawRect(-(gridData.width/2), -(gridData.height/2), (gridData.width), (gridData.height));
			
			newDefaultShape.x = newPathShape.x = newHoverShape.x = ((gridData.width) * (c)) + gridData.x;
			newDefaultShape.y = newPathShape.y = newHoverShape.y = ((gridData.height) * (r)) + gridData.y;
			
			newDefaultShape.alpha = .1;
			newHoverShape.alpha = 0;
			newPathShape.alpha = 0;
			
			edit.default[r][c] = newDefaultShape;
			edit.hover[r][c] = newHoverShape;
			edit.path[r][c] = newPathShape;
			
			newDefaultShape.c = c;
			newDefaultShape.r = r;
			buildGridEvents(newDefaultShape);
			editToolContainer.addChild(newDefaultShape, newPathShape, newHoverShape);
		}	
	}
	
	gridPath = new createjs.Bitmap(loader.getResult('gridPath'));
	centerReg(gridPath);
	gridEnter = new createjs.Bitmap(loader.getResult('gridEnter'));
	centerReg(gridEnter);
	gridExit = new createjs.Bitmap(loader.getResult('gridExit'));
	centerReg(gridExit);
	gridTower = new createjs.Bitmap(loader.getResult('gridTower'));
	centerReg(gridTower);
	
	editToolContainer.addChild(gridPath, gridEnter, gridExit, gridTower, editWayContainer);
	editContainer.addChild(editLevelContainer, editToolContainer);
}

/*!
 * 
 * SETUP OBJECTS EVENTS - This is the function that runs to setup objects events
 * 
 */
function buildGridEvents(obj){
	obj.addEventListener("mouseover", function(evt) {
		toggleGridEvent(evt, 'over')
	});
	obj.addEventListener("mouseout", function(evt) {
		toggleGridEvent(evt, 'out')
	});
	obj.addEventListener("pressup", function(evt) {
		toggleGridEvent(evt, 'up')
	});
}

function toggleGridEvent(obj, con){
	switch(con){
		case 'over':
			edit.hover[obj.target.r][obj.target.c].alpha = .5;
		break;
		
		case 'out':
			edit.hover[obj.target.r][obj.target.c].alpha = 0;
		break;
		
		case 'up':
			updatePathData(obj.target.r, obj.target.c);
		break;
	}
}

/*!
 * 
 * TOGGLE STAGE - This is the function that runs to toggle levels
 * 
 */
function toggleLevel(con){
	if(con){
		gameData.levelNum++;
		gameData.levelNum = gameData.levelNum > levels_arr.length - 1 ? 0 : gameData.levelNum;
	}else{
		gameData.levelNum--;
		gameData.levelNum = gameData.levelNum < 0 ? levels_arr.length - 1 : gameData.levelNum;
	}
	$('#levellist').prop("selectedIndex", gameData.levelNum);
	reloadEditLevel(true);
}

/*!
 * 
 * ACTION STAGE - This is the function that runs to action level
 * 
 */
function actionLevel(con){
	switch(con){
		case 'new':
			levels_arr.push({level:{src:'', resource:50, life:5, tower:[]}, path:[[]], wave:[[]], tower:[], towerupgrade:[]});
			gameData.levelNum = levels_arr.length-1;
		break;
		
		case 'remove':
			levels_arr.splice(gameData.levelNum, 1);
			gameData.levelNum = 0;
		break;
		
		case 'moveup':
			if(gameData.levelNum-1 >= 0){
				swapArray(levels_arr, gameData.levelNum-1, gameData.levelNum);
				gameData.levelNum--;
			}
		break;
		
		case 'movedown':
			if(gameData.levelNum+1 < levels_arr.length){
				swapArray(levels_arr, gameData.levelNum+1, gameData.levelNum);
				gameData.levelNum++;
			}
		break;
	}
	
	buildLevelDD();
	reloadEditLevel(true);
}

/*!
 * 
 * BUILD LEVEL DROPDOWN - This is the function that runs to build level dropdown
 * 
 */
function buildLevelDD(){
	$('#levellist').empty();
	for(n=0;n<levels_arr.length;n++){
		$('#levellist').append($("<option/>", {
			value: n,
			text: 'Level '+(n+1)
		}));
	}	
	
	$('#levellist').prop("selectedIndex", gameData.levelNum);
}

/*!
 * 
 * UPDATE STAGE DATA - This is the function that runs to update level data
 * 
 */
function updateLevelData(){
	levels_arr[gameData.levelNum].level.src = $('#levelImage').val();
	levels_arr[gameData.levelNum].level.resource = Number($('#levelResource').val());
	levels_arr[gameData.levelNum].level.life = Number($('#levelLife').val());
	
	reloadEditLevel(true);
}

/*!
 * 
 * TOGGLE PATH - This is the function that runs to toggle paths
 * 
 */
function togglePath(con){
	if(con){
		$.editor.pathNum++;
		$.editor.pathNum = $.editor.pathNum > levels_arr[gameData.levelNum].path.length - 1 ? 0 : $.editor.pathNum;
	}else{
		$.editor.pathNum--;
		$.editor.pathNum = $.editor.pathNum < 0 ? levels_arr[gameData.levelNum].path.length - 1 : $.editor.pathNum;
	}
	$('#pathlist').prop("selectedIndex", $.editor.pathNum);
	
	$('#waveValue').val('');
	$('#waveDelay').val('');
	$('#waveSpace').val('');
	$('#waveSpeed').val('');
	$('#removeWave, #updateWave').hide();
	
	buildWaveDD();
	reloadEditLevel(false);
}

/*!
 * 
 * ACTION PATH - This is the function that runs to action path
 * 
 */
function actionPath(con){
	switch(con){
		case 'new':
			levels_arr[gameData.levelNum].path.push([]);
			levels_arr[gameData.levelNum].wave.push([]);
			$.editor.pathNum = levels_arr[gameData.levelNum].path.length-1;
			$.editor.pathNum = $.editor.pathNum < 0 ? 0 : $.editor.pathNum;
		break;
		
		case 'remove':
			levels_arr[gameData.levelNum].path.splice($.editor.pathNum, 1);
			levels_arr[gameData.levelNum].wave.splice($.editor.pathNum, 1);
			$.editor.pathNum = 0;
			if(levels_arr[gameData.levelNum].path.length == 0){
				actionPath('new');	
			}
		break;
	}
	
	buildPathDD();
	reloadEditLevel(false);
}

function buildPathDD(){
	$('#pathlist').empty();
	for(n=0;n<levels_arr[gameData.levelNum].path.length;n++){
		$('#pathlist').append($("<option/>", {
			value: n,
			text: 'Path '+(n+1)
		}));
	}	
	
	$('#pathlist').prop("selectedIndex", $.editor.pathNum);
}

 /*!
 * 
 * UPDATE PATH DATA - This is the function that runs to update path data
 * 
 */
function updatePathData(r,c){
	if(edit.option == 'path'){
		if(edit.edit == 'connect'){
			if(levels_arr[gameData.levelNum].path[$.editor.pathNum].length == 0){
				levels_arr[gameData.levelNum].path[$.editor.pathNum].push({r:r, c:c});
				reloadEditLevel(false);
				findWayPath();
			}else if(edit.path[r][c].alpha == 1){
				levels_arr[gameData.levelNum].path[$.editor.pathNum].push({r:r, c:c});
				reloadEditLevel(false);
				findWayPath();
			}
		}
	}else if(edit.option == 'tower'){
		var existTower = false;
		for(var t=0; t < levels_arr[gameData.levelNum].tower.length; t++){
			if(r == levels_arr[gameData.levelNum].tower[t].r && c == levels_arr[gameData.levelNum].tower[t].c){
				levels_arr[gameData.levelNum].tower.splice(t,1);
				existTower = true;
			}
		}
		if(!existTower){
			levels_arr[gameData.levelNum].tower.push({r:r, c:c});	
		}
		reloadEditLevel(false);
	}
}	

 /*!
 * 
 * TOGGLE EDIT PATH - This is the function that runs to toggle path edit
 * 
 */
function toggleEditPath(con){
	edit.edit = con;
	if(con != undefined){
		alert('Click on stage to update!');
		$('#editPathEnterExitWrapper').hide();
		$('#editPathWayWrapper').hide();
		$('#donePath').hide();
		$('#cancelPath').show();
	}else{
		$('#editPathEnterExitWrapper').show();
		$('#editPathWayWrapper').show();
		$('#donePath').show();
		$('#cancelPath').hide();	
	}
}

function toggleEditPathWay(con){
	edit.edit = con;
	if(con == 'connect'){
		alert('Click on stage to start connect path!');
		$('#editPathSelectWrapper').hide();
		$('#editPathWayWrapper').hide();
		$('#donePath').hide();
		
		$('#editPathWrapper').hide();
		$('#editWayWrapper').show();
		
		findWayPath();
	}else if(con == 'clear'){
		//clear
		levels_arr[gameData.levelNum].path[$.editor.pathNum] = [];
		reloadEditLevel(false);
	}else{
		for(var r = 0; r < gridData.row; r++){
			for(var c = 0; c < gridData.column; c++){
				edit.path[r][c].alpha = 0;
			}
		}
		$('#editPathSelectWrapper').show();
		$('#editPathWayWrapper').show();
		$('#donePath').show();
		$('#editPathWrapper').show();
		$('#editWayWrapper').hide();	
	}
}

function findWayPath(){
	if(levels_arr[gameData.levelNum].path[$.editor.pathNum].length == 0){
		return;	
	}
	
	var curR = levels_arr[gameData.levelNum].path[$.editor.pathNum][levels_arr[gameData.levelNum].path[$.editor.pathNum].length-1].r;
	var curC = levels_arr[gameData.levelNum].path[$.editor.pathNum][levels_arr[gameData.levelNum].path[$.editor.pathNum].length-1].c;
	var available_arr = [{r:curR, c:curC-1}, {r:curR, c:curC+1}, {r:curR-1, c:curC}, {r:curR+1, c:curC}];
			
	for(var r = 0; r < gridData.row; r++){
		for(var c = 0; c < gridData.column; c++){
			var avaiCon = false;
			for(var a = 0; a < available_arr.length; a++){
				if(r == available_arr[a].r && c == available_arr[a].c){
					avaiCon = true;
					a = available_arr.length;
				}
			}
			
			if(avaiCon && !notExistWayPath(r,c)){
				edit.path[r][c].alpha = 1;
			}else{
				edit.path[r][c].alpha = 0;	
			}
		}
	}
}

function notExistWayPath(r,c){
	var exist = false;
	for(var p=0; p < levels_arr[gameData.levelNum].path[$.editor.pathNum].length; p++){
		if(r == levels_arr[gameData.levelNum].path[$.editor.pathNum][p].r && c == levels_arr[gameData.levelNum].path[$.editor.pathNum][p].c){
			exist = true;
			p = levels_arr[gameData.levelNum].path[$.editor.pathNum].length;
		}
	}
	
	if(exist){
		return true;	
	}else{
		return false;	
	}
}

/*!
 * 
 * ACTION WAVE - This is the function that runs to action wave
 * 
 */
function actionWave(con){
	switch(con){
		case 'new':
			levels_arr[gameData.levelNum].wave[$.editor.pathNum].push({delay:Number($('#waveDelay').val()), list:$('#waveValue').val(), space:Number($('#waveSpace').val()), speed:Number($('#waveSpeed').val())});
			$.editor.waveNum = levels_arr[gameData.levelNum].wave[$.editor.pathNum].length-1;
		break;
		
		case 'remove':
			levels_arr[gameData.levelNum].wave[$.editor.pathNum].splice($.editor.waveNum, 1);
			$.editor.waveNum = 0;
			if(levels_arr[gameData.levelNum].wave[$.editor.pathNum].length == 0){
				actionWave('new');	
			}
		break;
	}
	
	buildWaveDD();
}

function buildWaveDD(){	
	$('#wavelist').empty();
	
	//sync Path
	for(var n = 0; n<levels_arr[gameData.levelNum].path.length; n++){
		if(levels_arr[gameData.levelNum].wave.length < levels_arr[gameData.levelNum].path.length){
				
		}
	}
	
	for(n=0;n<levels_arr[gameData.levelNum].wave[$.editor.pathNum].length;n++){
		$('#wavelist').append($("<option/>", {
			value: n,
			text: (n+1)+' : '+levels_arr[gameData.levelNum].wave[$.editor.pathNum][n].list
		}));
	}
	$('#wavelist').prop("selectedIndex", $.editor.waveNum);
}

/*!
 * 
 * UPDATE WAVE DATA - This is the function that runs to update wave data
 * 
 */
function updateWaveData(){
	if(levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].length == 0){
		return;	
	}
	
	levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].list = $('#waveValue').val();
	levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].delay = Number($('#waveDelay').val());
	levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].space = Number($('#waveSpace').val());
	levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum].speed = Number($('#waveSpeed').val());
	
	buildWaveDD();
}

/*!
 * 
 * SWAP WAVE - This is the function that runs to swap wave
 * 
 */
function swapWave(con){
	var tmp = levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum];
	var rebuild = false;
	if(con){
		if($.editor.waveNum+1 < levels_arr[gameData.levelNum].wave[$.editor.pathNum].length){
			levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum] = levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum+1];
			levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum+1] = tmp;
			$.editor.waveNum++;
			rebuild = true;
		}
	}else{
		if($.editor.waveNum-1 >= 0){
			levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum] = levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum-1];
			levels_arr[gameData.levelNum].wave[$.editor.pathNum][$.editor.waveNum-1] = tmp;
			$.editor.waveNum--;
			rebuild = true;
		}
	}

	if(rebuild){
		buildWaveDD();
	}
}

/*!
 * 
 * BUILD TOWER - This is the function that runs to build tower list
 * 
 */
function buildTowerDD(){	
	$('#towerlist').empty();
	for(n=1;n<towers_arr.length;n++){
		var towerAvailable = 'DISABLE';
		var towerArrayIndex = levels_arr[gameData.levelNum].level.tower.indexOf(n);
		if(towerArrayIndex != -1){
			towerAvailable = 'AVAILABLE'
		}
		$('#towerlist').append($("<option/>", {
			value: n,
			text: (n)+' : '+towers_arr[n].name+' ('+towerAvailable+')'
		}));
	}
}

function buildTowerUpgradeDD(){	
	$('#towerupgradelist').empty();
	if(towers_arr[$.editor.towerNum].upgrade != undefined){
		if(towers_arr[$.editor.towerNum].upgrade.length > 0){
			var towerArrayIndex = levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum);
			
			for(var u=0;u<towers_arr[$.editor.towerNum].upgrade.length;u++){
				var towerUpgradeAvailable = 'DISABLE';
				if(levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] >= u){
					towerUpgradeAvailable = 'AVAILABLE'
				}
				$('#towerupgradelist').append($("<option/>", {
					value: u,
					text: (u+1)+' : '+towers_arr[$.editor.towerNum].upgrade[u].name+' ('+towerUpgradeAvailable+')'
				}));
			}
		}
	}
}

/*!
 * 
 * UPDATE TOWER DATA - This is the function that runs to update tower data
 * 
 */
function updateTowerData(){
	if($.editor.towerUpgradeNum == -1){
		if($('#towerEnable').val() == 1){
			if(levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum) == -1){
				levels_arr[gameData.levelNum].level.tower.push($.editor.towerNum);
				levels_arr[gameData.levelNum].level.towerupgrade.push(-1);
			}	
		}else{
			if(levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum) != -1){
				for(var t=0; t < levels_arr[gameData.levelNum].level.tower.length; t++){
					if($.editor.towerNum == levels_arr[gameData.levelNum].level.tower[t]){
						levels_arr[gameData.levelNum].level.tower.splice(t,1);
						levels_arr[gameData.levelNum].level.towerupgrade.splice(t,1);
						t = levels_arr[gameData.levelNum].level.tower.length;
					}
				}
			}
		}		
	}else{
		var towerArrayIndex = levels_arr[gameData.levelNum].level.tower.indexOf($.editor.towerNum);
		var towerUpgradeNum = Number(levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex]);
		if($('#towerEnable').val() == 1){
			if(levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] < $.editor.towerUpgradeNum){
				levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] = $.editor.towerUpgradeNum;	
			}
		}else{
			if($.editor.towerUpgradeNum == -1){
				levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] = -1;
			}else if(levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] > $.editor.towerUpgradeNum-1){
				levels_arr[gameData.levelNum].level.towerupgrade[towerArrayIndex] = $.editor.towerUpgradeNum-1;	
			}
		}	
	}
	
	buildTowerDD();
	buildTowerUpgradeDD();
}

/*!
 * 
 * RELOAD EDIT STAGE - This is the function that runs to reload edit level
 * 
 */
function reloadEditLevel(con){
	editWayContainer.removeAllChildren();
	
	for(var p=0; p < levels_arr[gameData.levelNum].path.length; p++){
		for(var pi=0; pi < levels_arr[gameData.levelNum].path[p].length; pi++){
			var visibleCon = true;
			var newPath = gridPath.clone();
			newPath.x = gridData.array[levels_arr[gameData.levelNum].path[p][pi].r][levels_arr[gameData.levelNum].path[p][pi].c].x;
			newPath.y = gridData.array[levels_arr[gameData.levelNum].path[p][pi].r][levels_arr[gameData.levelNum].path[p][pi].c].y;
			
			if(p != $.editor.pathNum){
				if(edit.option == 'path' || edit.option == 'wave' || edit.option == 'tower'){
					newPath.alpha = .3;
					visibleCon = false;
				}
			}
			editWayContainer.addChild(newPath);	
			
			if(pi == 0){
				$.editObj[p+'enter'] = gridEnter.clone();
				$.editObj[p+'enter'].x = newPath.x;
				$.editObj[p+'enter'].y = newPath.y;
				if(!visibleCon){
					$.editObj[p+'enter'].alpha = .3;	
				}
				editWayContainer.addChild($.editObj[p+'enter']);
			}
			
			if(pi == levels_arr[gameData.levelNum].path[p].length-1){
				$.editObj[p+'exit'] = gridExit.clone();
				$.editObj[p+'exit'].x = newPath.x;
				$.editObj[p+'exit'].y = newPath.y;
				if(!visibleCon){
					$.editObj[p+'exit'].alpha = .3;	
				}
				editWayContainer.addChild($.editObj[p+'exit']);
			}	
		}
	}
	
	for(var t=0; t < levels_arr[gameData.levelNum].tower.length; t++){
		$.editObj[p+'tower'] = gridTower.clone();
		$.editObj[p+'tower'].x = gridData.array[levels_arr[gameData.levelNum].tower[t].r][levels_arr[gameData.levelNum].tower[t].c].x;
		$.editObj[p+'tower'].y = gridData.array[levels_arr[gameData.levelNum].tower[t].r][levels_arr[gameData.levelNum].tower[t].c].y;
		
		if(edit.option == 'path' || edit.option == 'wave'){
			$.editObj[p+'tower'].alpha = .3;
		}
		
		editWayContainer.addChild($.editObj[p+'tower']);	
	}
	
	if(con)
	loadLevelAssets();
}

/*!
 * 
 * LOAD STAGE PRELOADER - This is the function that runs to preload level image
 * 
 */
var editLoader, editFest;
function loadLevelAssets(){
	editFest = [];
	editLevelContainer.removeAllChildren();
	
	if(levels_arr[gameData.levelNum].level.src != ''){
		editFest.push({src:levels_arr[gameData.levelNum].level.src, id:'editLevel'});
		editLoader = new createjs.LoadQueue(false);	
		editLoader.addEventListener("complete", handleLevelComplete);
		editLoader.loadManifest(editFest);
	}
}

function handleLevelComplete() {
	var levelImage = new createjs.Bitmap(editLoader.getResult('editLevel'));
	editLevelContainer.addChild(levelImage);
};

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateArray(){
	var outputArray = '';
	var space = '					';
	var space2 = '						';
	var space3 = '							';
	
	outputArray += "[\n";
	for(e=0;e<levels_arr.length;e++){
		var pathArray = '';
		for(var p=0; p < levels_arr[e].path.length; p++){
			pathArray += '[';
			for(var pi=0; pi < levels_arr[e].path[p].length; pi++){
				pathArray += "{r:"+levels_arr[e].path[p][pi].r+", c:"+levels_arr[e].path[p][pi].c+"},";
			}
			pathArray += '],';
		}
		
		var waveArray = '';
		for(var w=0; w < levels_arr[e].wave.length; w++){
			waveArray += '[';
			for(var wi=0; wi < levels_arr[e].wave[w].length; wi++){
				waveArray += "{delay:"+levels_arr[e].wave[w][wi].delay+", list:'"+levels_arr[e].wave[w][wi].list+"', space:"+levels_arr[e].wave[w][wi].space+", speed:"+levels_arr[e].wave[w][wi].speed+"},";
			}
			waveArray += '],\n';
		}
		
		var towerArray = '';
		for(var t=0; t < levels_arr[e].tower.length; t++){
			towerArray += "{r:"+levels_arr[e].tower[t].r+", c:"+levels_arr[e].tower[t].c+"},";
		}
		
		outputArray += space+"{\n";
		outputArray += space2+"level:{src:'"+levels_arr[e].level.src+"', resource:"+levels_arr[e].level.resource+", life:"+levels_arr[e].level.life+", tower:["+levels_arr[e].level.tower+"], towerupgrade:["+levels_arr[e].level.towerupgrade+"]},\n"+space2+"path:["+pathArray+"],\n"+space2+"wave:["+waveArray+"],\n"+space2+"tower:["+towerArray+"]\n";
		outputArray += space+"},\n\n";
	}
	outputArray += space+'];';
	$('#outputArray').val(outputArray);	
}

/*!
 * 
 * TOGGLE GAME PLAY - This is the function that runs to toggle game play
 * 
 */
function toggleGamePlay(con){
	editToolContainer.visible = true;
	statusContainer.visible = true;
	
	if(con){
		editToolContainer.visible = false;
		toggleGameStatus('Game start:');
		startGame();
	}else{
		statusContainer.visible = false;
		stopGame(true);
	}
}

function toggleGameStatus(text){
	$('#gameStatus').html(text);
}