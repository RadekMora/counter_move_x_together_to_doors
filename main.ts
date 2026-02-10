sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Food, function (sprite, otherSprite) {
    if (mySprite.overlapsWith(otherSprite)) {
        NEW = 0
        sprites.destroyAllSpritesOfKind(SpriteKind.Food)
        tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
        tiles.placeOnRandomTile(mySprite2, assets.tile`transparency16`)
    }
})
let Exit: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
let NEW = 0
let Timeset = 901
let Life = 9
let Pointtext = textsprite.create("0")
Pointtext.setIcon(assets.image`Star`)
Pointtext.setPosition(10, 116)
let Points = -1
let Lifetext = textsprite.create(convertToText(Life))
Lifetext.setPosition(146, 116)
Lifetext.setIcon(assets.image`Life`)
let Time = Timeset
let TimeText = textsprite.create(convertToText(Time / 10))
TimeText.setPosition(80, 116)
NEW = 0
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
mySprite2 = sprites.create(img`
    . . . . f f f f . . . . 
    . . f f e e e e f f . . 
    . f f e e e e e e f f . 
    f f f f 4 e e e f f f f 
    f f f 4 4 4 e e f f f f 
    f f f 4 4 4 4 e e f f f 
    f 4 e 4 4 4 4 4 4 e 4 f 
    f 4 4 f f 4 4 f f 4 4 f 
    f e 4 d d d d d d 4 e f 
    . f e d d b b d d e f . 
    . f f e 4 4 4 4 e f f . 
    e 4 f b 1 1 1 1 b f 4 e 
    4 d f 1 1 1 1 1 1 f d 4 
    4 4 f 6 6 6 6 6 6 f 4 4 
    . . . f f f f f f . . . 
    . . . f f . . f f . . . 
    `, SpriteKind.Enemy)
scene.setBackgroundImage(assets.image`První pozadí`)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
tiles.placeOnRandomTile(mySprite2, assets.tile`transparency16`)
controller.moveSprite(mySprite)
controller.moveSprite(mySprite2, -100, 100)
forever(function () {
    while (NEW == 0) {
        Exit = sprites.create(assets.image`Dvere`, SpriteKind.Food)
        tiles.placeOnRandomTile(Exit, assets.tile`transparency16`)
        if (mySprite.tilemapLocation() == Exit.tilemapLocation() || mySprite2.tilemapLocation() == Exit.tilemapLocation()) {
            NEW = 0
        } else {
            NEW = 1
            Time = Timeset
            Points += 1
            Pointtext.setText(convertToText(Points))
        }
    }
})
game.onUpdateInterval(100, function () {
    if (Time == 0) {
        Life += -1
        Lifetext.setText(convertToText(Life))
        if (Life == 0) {
            Lifetext.setText(convertToText(Life))
            info.setScore(Points)
            game.setGameOverScoringType(game.ScoringType.HighScore)
            game.setGameOverMessage(true, "GAME OVER!")
            game.gameOver(true)
        }
        NEW = 0
        sprites.destroyAllSpritesOfKind(SpriteKind.Food)
        tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
        tiles.placeOnRandomTile(mySprite2, assets.tile`transparency16`)
    } else {
        Time += -1
    }
    if (Time % 10 == 0) {
        TimeText.setText("" + convertToText(Time / 10) + "." + "0")
    } else {
        TimeText.setText(convertToText(Time / 10))
    }
})
