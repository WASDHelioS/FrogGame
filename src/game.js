console.log("Game started!");
var game = new Game();
game.chaoImages = [];

window.onload = function ()
{

    game.preloadImagesThenStart(
        [
            { name: "arrow", url: "images/arrow.png", subImgTotal: 4, perRow: 2 },
            { name: "gem", url: "images/gems.png", subImgTotal: 72, perRow: 6 },
            { name: "ball", url: "images/ball.png", subImgTotal: 4, perRow: 4 },
            { name: "grass_dark", url: "images/grass_dark.png" },
            { name: "grass_light", url: "images/grass_light.png" },
            { name: "frog_basic", url: "images/character/frog/frog_basic.png", subImgTotal: 4, perRow: 4 },
            { name: "frog_tongue_base", url: "images/character/frog/frog_tongue_base.png" },
            { name: "frog_tongue_tip", url: "images/character/frog/frog_tongue_tip.png" },
            { name: "chao_default", url: "images/character/chao/default.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_blue", url: "images/character/chao/blue.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_cyan", url: "images/character/chao/cyan.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_dark", url: "images/character/chao/dark.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_darkgreen", url: "images/character/chao/darkgreen.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_green", url: "images/character/chao/green.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_lightgreen", url: "images/character/chao/lightgreen.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_hero", url: "images/character/chao/hero.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_orange", url: "images/character/chao/orange.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_pink", url: "images/character/chao/pink.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_purple", url: "images/character/chao/purple.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_red", url: "images/character/chao/red.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_white", url: "images/character/chao/white.png", subImgTotal: 67, perRow: 9 },
            { name: "chao_yellow", url: "images/character/chao/yellow.png", subImgTotal: 67, perRow: 9 },
            { name: "tile_floor_brown", url: "images/tile/tile_floor_brown.png" },
            { name: "tile_floor_explosion", url: "images/tile/tile_floor_explosion_anim.png", subImgTotal: 10, perRow: 5 },
            { name: "fruit", url: "images/object/fruit.png", subImgTotal: 15, perRow: 8 }
        ]
        , function ()
        {
            game.images.frog_basic.addAnimationCycle("walk", [0, 1, 2, 1], true);
            game.images.tile_floor_explosion.addAnimationCycle("destroy", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], false);
            this.setupChaoAnimations(game.images.chao_default);
            this.setupChaoAnimations(game.images.chao_blue);
            this.setupChaoAnimations(game.images.chao_cyan);
            this.setupChaoAnimations(game.images.chao_dark);
            this.setupChaoAnimations(game.images.chao_darkgreen);
            this.setupChaoAnimations(game.images.chao_green);
            this.setupChaoAnimations(game.images.chao_lightgreen);
            this.setupChaoAnimations(game.images.chao_hero);
            this.setupChaoAnimations(game.images.chao_orange);
            this.setupChaoAnimations(game.images.chao_pink);
            this.setupChaoAnimations(game.images.chao_purple);
            this.setupChaoAnimations(game.images.chao_red);
            this.setupChaoAnimations(game.images.chao_white);
            this.setupChaoAnimations(game.images.chao_yellow);

            this.createMainScene(game);
        });
};

function setupChaoAnimations (image)
{
    game.chaoImages.push(image);
    image.addAnimationCycle("walkDown", [0, 1, 0, 2], true);
    image.addAnimationCycle("walkLeft", [3, 4, 3, 5], true);
    image.addAnimationCycle("walkUp", [6, 7, 6, 8], true);

    image.addAnimationCycle("standDown", [0]);
    image.addAnimationCycle("standLeft", [3]);
    image.addAnimationCycle("standUp", [6]);

    image.addAnimationCycle("flyDown", [9, 10, 11, 10], true);
    image.addAnimationCycle("flyLeft", [12, 13, 14, 13], true);
    image.addAnimationCycle("flyUp", [15, 16, 17, 16], true);

    image.addAnimationCycle("tripDown", [18, 19, 20]);
    image.addAnimationCycle("tripLeft", [21, 22, 23]);
    image.addAnimationCycle("tripUp", [24, 25, 26]);

    image.addAnimationCycle("sitDown", [27]);
    image.addAnimationCycle("sitLeft", [28]);

    image.addAnimationCycle("tantrum", [29, 30, 29, 31, 32, 33, 33], false, "standDownAngry");
    image.addAnimationCycle("standDownAngry", [29], true);

    image.addAnimationCycle("swimStruggle", [34, 35], true);
    image.addAnimationCycle("eatStart", [36, 37, 38], false, "eat");
    image.addAnimationCycle("eat", [37, 38], true);

    image.addAnimationCycle("cheer", [39, 40, 39, 40, 39, 40, 39, 40, 39, 40], false, "standDown");
    image.addAnimationCycle("wave", [41, 42, 42, 42, 42], false, "standDown");

    image.addAnimationCycle("hungry", [43, 44, 43, 44, 43, 44, 43, 44], false, "standDown");

    image.addAnimationCycle("no", [45, 46, 45, 47, 45, 46, 45, 47], false, "standDownBored");
    image.addAnimationCycle("standDownBored", [45], false);

    image.addAnimationCycle("think", [48, 48, 48, 48, 48], false, "standDown");
    image.addAnimationCycle("happy", [49, 50, 49, 51], true);
    image.addAnimationCycle("standDownSad", [52], false);
    image.addAnimationCycle("sleep", [53, 54], true);
    image.addAnimationCycle("eureka", [60, 60, 60, 66, 66, 48], false, "wave");

    image.addAnimationCycle("swim", [55, 56, 57], true);
    image.addAnimationCycle("eatBig", [58, 59], true);
    image.addAnimationCycle("sneeze", [60, 61, 62, 63], false, "standDown");
    image.addAnimationCycle("cry", [64, 65, 64, 65, 64, 65, 64, 65, 64, 65], false, "standDownSad");
    image.addAnimationCycle("think2", [66, 66, 66, 66, 66, 66], false, "standDown");
}

createMainScene = function (game)
{
    var background = new BackgroundScene(0, 0, 1, 1, Scene.DisplayModes.relativeToParent);
    var scene = new Scene(0, 0, 1, 1, Scene.DisplayModes.relativeToParent);
    scene.renderBackground = false;

    game.loadScene(background);
    game.loadScene(scene);

    background.addObject(new GrassTiler(50, 50, game.images.arrow, 0));
    chao = new Chao(60, 60, game.images.chao_default, 0);
    scene.addObject(chao);

    createSubScene(scene);
};

createSubScene = function (scene) 
{
    var subScene = new FrogScene(200, 200, 416, 512, Scene.DisplayModes.absolute);

    subScene.gameSpeed = 1;

    scene.loadChildScene(subScene);

    frog = new Frog(60, subScene.real_size.y - 50, game.images.frog_basic, 0);
    for (tx = 10; tx < subScene.real_size.x - 10; tx += 15) 
    {
        subScene.addObject(new FloorTile(tx, subScene.real_size.y - 30, game.images.tile_floor_brown, 0));
    }
    subScene.addObject(frog);
};