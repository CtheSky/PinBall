/**
 * Created by cthes on 2016/11/19.
 */

/*
 * -------- Set global bos2d variables -----------
 */

// Set scale factor from pixel to meters in box2d
var SCALE = 30;
// Set shortcut for Box2D definition
var   b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ;

// Set dynamic box2d definition constant
var DYNAMIC_DEF_EXAMPLE = {
    fixDef: new b2FixtureDef,
    bodyDef: new b2BodyDef
};
DYNAMIC_DEF_EXAMPLE.fixDef.density = 1.0;
DYNAMIC_DEF_EXAMPLE.fixDef.friction = 0.5;
DYNAMIC_DEF_EXAMPLE.fixDef.restitution = 0.2;
DYNAMIC_DEF_EXAMPLE.bodyDef.type = b2Body.b2_dynamicBody;

// Set static box2d definition constant
var STATIC_DEF_EXAMPLE = {
    fixDef: new b2FixtureDef,
    bodyDef: new b2BodyDef
};
STATIC_DEF_EXAMPLE.fixDef.density = 1.0;
STATIC_DEF_EXAMPLE.fixDef.friction = 0.5;
STATIC_DEF_EXAMPLE.fixDef.restitution = 0.2;
STATIC_DEF_EXAMPLE.bodyDef.type = b2Body.b2_staticBody;


/*
 * -------- Subclass of Draggable -----------
 */
var StaticSquare = function(imageProp){
    Draggable.call(this, STATIC_DEF_EXAMPLE, imageProp);
};
StaticSquare.prototype = Object.create(Draggable.prototype);
StaticSquare.prototype.constructor = StaticSquare;
StaticSquare.prototype.createBox2dObjectInWorld = createSquareBox2dObjectInWorld;

var DynamicSquare = function(imageProp){
    Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp);
};
DynamicSquare.prototype = Object.create(Draggable.prototype);
DynamicSquare.prototype.constructor = DynamicSquare;
DynamicSquare.prototype.createBox2dObjectInWorld = createSquareBox2dObjectInWorld;


function createSquareBox2dObjectInWorld(world) {
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsBox(this.imageWidth * 0.5 / SCALE, this.imageHeight * 0.5 / SCALE);

    this.b2BodyDef.position.x = this.imageX / SCALE;
    this.b2BodyDef.position.y = this.imageY / SCALE;

    world.CreateBody(this.b2BodyDef).CreateFixture(this.b2FixtureDef);
}; // createSquareBox2dObjectInWorld(world)