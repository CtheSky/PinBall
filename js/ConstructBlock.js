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
var StaticSquare = function(imageProp){ Draggable.call(this, STATIC_DEF_EXAMPLE, imageProp); };
StaticSquare.prototype = Object.create(Draggable.prototype);
StaticSquare.prototype.constructor = StaticSquare;
StaticSquare.prototype.createBox2dObjectInWorld = createSquareBox2dObjectInWorld;

var DynamicSquare = function(imageProp){ Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp); };
DynamicSquare.prototype = Object.create(Draggable.prototype);
DynamicSquare.prototype.constructor = DynamicSquare;
DynamicSquare.prototype.createBox2dObjectInWorld = createSquareBox2dObjectInWorld;

var StaticCircle = function(imageProp){ Draggable.call(this, STATIC_DEF_EXAMPLE, imageProp); };
StaticCircle.prototype = Object.create(Draggable.prototype);
StaticCircle.prototype.constructor = StaticCircle;
StaticCircle.prototype.createBox2dObjectInWorld = createCircleBox2dObjectInWorld;

var DynamicCircle = function(imageProp){ Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp); };
DynamicCircle.prototype = Object.create(Draggable.prototype);
DynamicCircle.prototype.constructor = DynamicCircle;
DynamicCircle.prototype.createBox2dObjectInWorld = createCircleBox2dObjectInWorld;

var StaticTriangle = function(imageProp){
    Draggable.call(this, STATIC_DEF_EXAMPLE, imageProp);
};
StaticTriangle.prototype = Object.create(Draggable.prototype);
StaticTriangle.prototype.constructor = StaticTriangle;
StaticTriangle.prototype.createBox2dObjectInWorld = createTriangleBox2dObjectInWorld;

var DynamicTriangle = function(imageProp){
    Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp);
};
DynamicTriangle.prototype = Object.create(Draggable.prototype);
DynamicTriangle.prototype.constructor = DynamicTriangle;
DynamicTriangle.prototype.createBox2dObjectInWorld = createTriangleBox2dObjectInWorld;

// Helper function to create square box2d object
function createSquareBox2dObjectInWorld(world) {
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsBox(this.imageWidth * 0.5 / SCALE, this.imageHeight * 0.5 / SCALE);
    console.log(this.b2FixtureDef.shape);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    world.CreateBody(this.b2BodyDef).CreateFixture(this.b2FixtureDef);
};

// Helper function to create circle box2d object
function createCircleBox2dObjectInWorld(world){
    this.b2FixtureDef.shape = new b2CircleShape(this.imageWidth * 0.5 / SCALE);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    world.CreateBody(this.b2BodyDef).CreateFixture(this.b2FixtureDef);
};

// Helper function to create triangle box2d object
function createTriangleBox2dObjectInWorld(world){
    var vectors = [new b2Vec2(0, 0), new b2Vec2(this.imageWidth / SCALE, 0),new b2Vec2(0, this.imageHeight / SCALE)];
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);
    console.log(this.b2FixtureDef.shape);

    this.b2BodyDef.position.x = this.imageX / SCALE;
    this.b2BodyDef.position.y = this.imageY / SCALE;

    world.CreateBody(this.b2BodyDef).CreateFixture(this.b2FixtureDef);
};