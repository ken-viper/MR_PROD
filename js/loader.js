////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////
 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
 function initPreload(){
	toggleLoader(true);
	checkMobileEvent();
	$(window).resize(function(){ 
		resizeGameFunc();
	});
	resizeGameFunc();
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},

			{src:'assets/button_join_the_fight.png', id:'buttonJoinFightActive'},
			{src:'assets/button_join_the_fight_inactive.png', id:'buttonJoinFightInactive'},
			{src:'assets/Duel_CU_vs_SC.png', id:'modalCU_SC'},
			{src:'assets/Duel_CU_vs_XX.png', id:'modalCU_XX'},
			{src:'assets/Menu_back_to_duels.png', id:'buttonBackToDuels'},
			{src:'assets/Select_duel_background.png', id:'imgDuelBackground'},
			
			{src:'assets/icon_menu.png', id:'iconMenu'},
			{src:'assets/icon_menu_close.png', id:'iconMenuClose'},
			{src:'assets/item_select.png', id:'itemSelect'},
			{src:'assets/button_arrow.png', id:'buttonArrow'},
			{src:'assets/item_level.png', id:'itemLevel'},
			{src:'assets/item_level_lock.png', id:'itemLevelLock'},
			
			{src:'assets/grid_path.png', id:'gridPath'},
			{src:'assets/grid_enter.png', id:'gridEnter'},
			{src:'assets/grid_exit.png', id:'gridExit'},
			{src:'assets/grid_tower.png', id:'gridTower'},
			
			{src:'assets/item_love.png', id:'itemLove'},
			{src:'assets/item_stage_overlay.png', id:'itemStageOverlay'},
			{src:'assets/item_status.png', id:'itemStatus'},
			{src:'assets/item_grid.png', id:'itemGrid'},
			{src:'assets/item_menu_bg.png', id:'itemMenuBg'},
			{src:'assets/item_menu_bg_small.png', id:'itemMenuBgSmall'},
			
			{src:'assets/item_arrow_guide.png', id:'itemArrowGuide'},
			
			{src:'assets/item_overlay_start.png', id:'itemOverlayStart'},
			{src:'assets/item_overlay.png', id:'itemOverlay'},
			{src:'assets/button_blank.png', id:'buttonBlank'},
			
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/button_claim.png', id:'buttonClaim'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_music_on.png', id:'buttonMusicOn'},
			{src:'assets/button_music_off.png', id:'buttonMusicOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'},

			{src:'assets/Menu_play.png', id:'buttonPlay'},
			{src:'assets/Menu_mint.png', id:'buttonMint'},
			{src:'assets/Menu_contribute.png', id:'buttonContribute'},

			{src:'assets/Page_Collect.png', id:'pageMint'},
			{src:'assets/Page_Contribute.png', id:'pageContribute'},
		
			{src:'assets/item_select_ammo.png', id:'ammoSelAmmoFrame'},
			{src:'assets/item_select_ammo_common.png', id:'ammoSelCommon'},
			{src:'assets/item_select_ammo_rare.png', id:'ammoSelRare'},
			{src:'assets/item_select_ammo_epic.png', id:'ammoSelEpic'},
			{src:'assets/item_select_ammo_mythic.png', id:'ammoSelMythic'},

			{src:'assets/button_damage_disabled.png', id:'btnDamageDisabled'},
			{src:'assets/button_heal_disabled.png', id:'btnHealDisabled'},
			{src:'assets/button_freeze_disabled.png', id:'btnFreezeDisabled'},

			{src:'assets/button_damage.png', id:'btnDamage'},
			{src:'assets/button_heal.png', id:'btnHeal'},
			{src:'assets/button_freeze.png', id:'btnFreeze'},

			{src:'assets/Full_Stamp.png', id:'imgFullStamp'},

			{src:'assets/X_Icon.png', id:'btnX'},
			{src:'assets/Discord_Icon.png', id:'btnDiscord'},

			{src:'assets/menu4.png', id:'buttonMenu4'},
			{src:'assets/menu4-1.png', id:'menu4_1'},
			{src:'assets/menu4-1-1.png', id:'menu4_1_1'},
			{src:'assets/menu4-2.png', id:'menu4_2'},
			{src:'assets/menu4-2-1.png', id:'menu4_2_1'},

			{src:'assets/menu5.png', id:'buttonMenu5'},
			{src:'assets/menu5-1.png', id:'menu5_1'},
			{src:'assets/menu5-1-1.png', id:'menu5_1_1'},
			{src:'assets/menu5-2.png', id:'menu5_2'},
			{src:'assets/menu5-2-1.png', id:'menu5_2_1'},

			{src:'assets/menu6.png', id:'buttonMenu6'},
			{src:'assets/menu6-1.png', id:'menu6_1'},
			{src:'assets/menu6-1-1.png', id:'menu6_1_1'},
			{src:'assets/menu6-2.png', id:'menu6_2'},
			{src:'assets/menu6-2-1.png', id:'menu6_2_1'},

			{src:'assets/menu7.png', id:'buttonMenu7'},
			{src:'assets/menu7-1.png', id:'menu7_1'},
			{src:'assets/menu7-1-1.png', id:'menu7_1_1'},
			{src:'assets/menu7-2.png', id:'menu7_2'},
			{src:'assets/menu7-2-1.png', id:'menu7_2_1'},
		];
	
	for(var n=0;n<levels_arr.length;n++){
		manifest.push({src:levels_arr[n].level.src, id:'stage'+n});
	}
	
	for(var n=0;n<monsters_arr.length;n++){
		manifest.push({src:monsters_arr[n].src, id:'monster'+n});
		if(monsters_arr[n].ammo.src != undefined){
			manifest.push({src:monsters_arr[n].ammo.src, id:'monsterAmmo'+n});
		}
	}
	
	for(var n=0;n<towers_arr.length;n++){
		manifest.push({src:towers_arr[n].image.src, id:'tower'+n});
		manifest.push({src:towers_arr[n].icon.src, id:'towerIcon'+n});
		manifest.push({src:towers_arr[n].icon.disable, id:'towerIconDisable'+n});
		if(towers_arr[n].ammo.src != undefined){
			manifest.push({src:towers_arr[n].ammo.src, id:'towerAmmo'+n});
		}
		if(towers_arr[n].upgrade != undefined){
			if(towers_arr[n].upgrade.length > 0){
				for(var u=0;u<towers_arr[n].upgrade.length;u++){
					manifest.push({src:towers_arr[n].upgrade[u].image.src, id:'tower'+n+'_'+u});
					manifest.push({src:towers_arr[n].upgrade[u].icon.src, id:'towerIcon'+n+'_'+u});
					manifest.push({src:towers_arr[n].upgrade[u].icon.disable, id:'towerIconDisable'+n+'_'+u});
					
					if(towers_arr[n].upgrade[u].ammo.src != undefined){
						manifest.push({src:towers_arr[n].upgrade[u].ammo.src, id:'towerAmmo'+n+'_'+u});
					}
				}
			}
		}
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/main_music.ogg', id:'musicMain'});
		manifest.push({src:'assets/sounds/game_music.ogg', id:'musicGame'});
		
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/dead1.ogg', id:'soundDead1'});
		manifest.push({src:'assets/sounds/dead2.ogg', id:'soundDead2'});
		manifest.push({src:'assets/sounds/dead3.ogg', id:'soundDead3'});
		manifest.push({src:'assets/sounds/dead4.ogg', id:'soundDead4'});
		
		manifest.push({src:'assets/sounds/hit1.ogg', id:'soundHit1'});
		manifest.push({src:'assets/sounds/hit2.ogg', id:'soundHit2'});
		manifest.push({src:'assets/sounds/hit3.ogg', id:'soundHit3'});
		
		manifest.push({src:'assets/sounds/alert.ogg', id:'soundAlert'});
		manifest.push({src:'assets/sounds/select.ogg', id:'soundMenu'});
		manifest.push({src:'assets/sounds/build.ogg', id:'soundBuild'});
		manifest.push({src:'assets/sounds/destroy.ogg', id:'soundDestroy'});
		
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'});
		manifest.push({src:'assets/sounds/success.ogg', id:'soundSuccess'});
		manifest.push({src:'assets/sounds/notification.ogg', id:'soundNotification'});
		manifest.push({src:'assets/sounds/life.ogg', id:'soundLife'});
		
		for(var n=0;n<towers_arr.length;n++){
			if(towers_arr[n].sound != undefined){
				manifest.push({src:towers_arr[n].sound, id:'soundTowerAmmo'+n});
			}
		}
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}
/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};
/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}