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
    , b2Transform = Box2D.Common.Math.b2Transform
    , b2Mat22 = Box2D.Common.Math.b2Mat22
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
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

var KINEMATIC_DEF_EXAMPLE = {
    fixDef: new b2FixtureDef,
    bodyDef: new b2BodyDef
};
KINEMATIC_DEF_EXAMPLE.fixDef.density = 1.0;
KINEMATIC_DEF_EXAMPLE.fixDef.friction = 0.5;
KINEMATIC_DEF_EXAMPLE.fixDef.restitution = 0.2;
KINEMATIC_DEF_EXAMPLE.bodyDef.type = b2Body.b2_kinematicBody;

/*
 * -------- Construct blocks,subclass of Draggable -----------
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

var LeftFlip = function(imageProp) {
    Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp);
};
LeftFlip.prototype = Object.create(Draggable.prototype);
LeftFlip.prototype.constructor = LeftFlip;
LeftFlip.prototype.createBox2dObjectInWorld = createLeftFlipBox2dObjectInWorld;

var RightFlip = function(imageProp) {
    Draggable.call(this, DYNAMIC_DEF_EXAMPLE, imageProp);
};
RightFlip.prototype = Object.create(Draggable.prototype);
RightFlip.prototype.constructor = RightFlip;
RightFlip.prototype.createBox2dObjectInWorld = createRightFlipBox2dObjectInWorld;

// Helper function to create square box2d object
function createSquareBox2dObjectInWorld(world) {
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsBox(this.imageWidth * 0.5 / SCALE, this.imageHeight * 0.5 / SCALE);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    var body = world.CreateBody(this.b2BodyDef);
    var vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body.CreateFixture(this.b2FixtureDef);
}

// Helper function to create circle box2d object
function createCircleBox2dObjectInWorld(world) {
    this.b2FixtureDef.shape = new b2CircleShape(this.imageWidth * 0.5 / SCALE);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    world.CreateBody(this.b2BodyDef).CreateFixture(this.b2FixtureDef);
}

// Helper function to create triangle box2d object
function createTriangleBox2dObjectInWorld(world) {
    var vectors = [
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(-0.5 * this.imageWidth / SCALE, 0.5 * this.imageHeight / SCALE)];
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    var body = world.CreateBody(this.b2BodyDef);
    var vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body.CreateFixture(this.b2FixtureDef);
}

// Help function to create left flip box2d object
function createLeftFlipBox2dObjectInWorld(world) {
    // ----------- create flip body ---------
    var vectors = [
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.4 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.3 * this.imageHeight / SCALE),
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.1 * this.imageHeight / SCALE)
    ];
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    var body = world.CreateBody(this.b2BodyDef);
    var vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body.CreateFixture(this.b2FixtureDef);

    // --------- create static block to joint -----
    vectors = [
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(-0.49 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(-0.49 * this.imageWidth / SCALE, -0.49 * this.imageHeight / SCALE),
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.49 * this.imageHeight / SCALE)
    ];
    this.b2BodyDef = STATIC_DEF_EXAMPLE.bodyDef;
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);
    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;
    var body2 = world.CreateBody(this.b2BodyDef);
    vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body2.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body2.CreateFixture(this.b2FixtureDef);

    // -------- create joint ---------
    var jointDef = new b2RevoluteJointDef();
    // compute joint position
    var vLength = Math.sqrt(this.imageWidth * this.imageWidth / 4 + this.imageHeight * this.imageHeight / 4) / SCALE;
    var degreeOffset = 180 - Math.atan(this.imageHeight / this.imageWidth) / TO_RADIANS;
    var vRadian = (degreeOffset - this.imageDegree) * TO_RADIANS;
    var vectorToAdd = new b2Vec2(vLength * Math.cos(vRadian), -1 * vLength * Math.sin(vRadian));
    var vectorPosition = body2.GetPosition().Copy();
    vectorPosition.Add(vectorToAdd);
    jointDef.Initialize(body, body2, vectorPosition);
    jointDef.lowerAngle     = -30 * TO_RADIANS;
    jointDef.upperAngle     = 30 * TO_RADIANS;
    jointDef.enableLimit    = true;
    jointDef.maxMotorTorque = 10.0;
    jointDef.motorSpeed     = -2.0;
    jointDef.enableMotor    = true;
    world.CreateJoint(jointDef);

    // ------- create key bind -------
    var flipKeyMap = new FlipKeyMap(this.keyBind, body, null, body.GetPosition());
    // compute force vector
    vLength = 10000;
    degreeOffset = 90 - Math.atan(this.imageHeight / this.imageWidth) / TO_RADIANS;
    vRadian = (degreeOffset - this.imageDegree) * TO_RADIANS;
    flipKeyMap.forceVector = new b2Vec2(vLength * Math.cos(vRadian), -1 * vLength * Math.sin(vRadian));
    flipKeyMaps.push(flipKeyMap);
}

// Help function to create left flip box2d object
function createRightFlipBox2dObjectInWorld(world) {
    // ----------- create flip body ---------
    var vectors = [
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.4 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.1 * this.imageHeight / SCALE),
        new b2Vec2(-0.5 * this.imageWidth / SCALE, -0.3 * this.imageHeight / SCALE)
    ];
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);

    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;

    var body = world.CreateBody(this.b2BodyDef);
    var vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body.CreateFixture(this.b2FixtureDef);

    // --------- create static block to joint -----
    vectors = [
        new b2Vec2(0.49 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.5 * this.imageHeight / SCALE),
        new b2Vec2(0.5 * this.imageWidth / SCALE, -0.49 * this.imageHeight / SCALE),
        new b2Vec2(0.49 * this.imageWidth / SCALE, -0.49 * this.imageHeight / SCALE)
    ];
    this.b2BodyDef = STATIC_DEF_EXAMPLE.bodyDef;
    this.b2FixtureDef.shape = new b2PolygonShape;
    this.b2FixtureDef.shape.SetAsArray(vectors, vectors.length);
    this.b2BodyDef.position.x = (this.imageX + this.imageWidth * 0.5) / SCALE;
    this.b2BodyDef.position.y = (this.imageY + this.imageHeight * 0.5) / SCALE;
    var body2 = world.CreateBody(this.b2BodyDef);
    vecToCenter = new b2Vec2((this.imageX + 0.5 * this.imageWidth) / SCALE, (this.imageY + 0.5 * this.imageHeight) / SCALE);
    body2.SetTransform(new b2Transform(vecToCenter, b2Mat22.FromAngle(this.imageDegree * TO_RADIANS)));
    body2.CreateFixture(this.b2FixtureDef);

    // -------- create joint ---------
    var jointDef = new b2RevoluteJointDef();
    // compute joint position
    var vLength = Math.sqrt(this.imageWidth * this.imageWidth / 4 + this.imageHeight * this.imageHeight / 4) / SCALE;
    var degreeOffset = Math.atan(this.imageHeight / this.imageWidth) / TO_RADIANS;
    var vRadian = (degreeOffset - this.imageDegree) * TO_RADIANS;
    var vectorToAdd = new b2Vec2(vLength * Math.cos(vRadian), -1 * vLength * Math.sin(vRadian));
    var vectorPosition = body2.GetPosition().Copy();
    vectorPosition.Add(vectorToAdd);
    jointDef.Initialize(body, body2, vectorPosition);
    jointDef.lowerAngle     = -30 * TO_RADIANS;
    jointDef.upperAngle     = 30 * TO_RADIANS;
    jointDef.enableLimit    = true;
    jointDef.maxMotorTorque = 10.0;
    jointDef.motorSpeed     = 2.0;
    jointDef.enableMotor    = true;
    world.CreateJoint(jointDef);

    // ------- create key bind -------
    var flipKeyMap = new FlipKeyMap(this.keyBind, body, null, body.GetPosition());
    // compute force vector
    vLength = 10000;
    degreeOffset = 90 + Math.atan(this.imageHeight / this.imageWidth) / TO_RADIANS;
    vRadian = (degreeOffset - this.imageDegree) * TO_RADIANS;
    flipKeyMap.forceVector = new b2Vec2(vLength * Math.cos(vRadian), -1 * vLength * Math.sin(vRadian));
    flipKeyMaps.push(flipKeyMap);
}

/*
 * -------------- FlipKeyMap, store force triggered by keyDown--------------
 */
var FlipKeyMap = function(key, body, forceVector,positionVector){
    this.key = key;
    this.body = body;
    this.forceVector = forceVector;
    this.positionVector = positionVector;
};
var flipKeyMaps = [];
// KeyDown Handler
document.body.addEventListener('keydown', function(e){
    console.log('' + e.key);
    for (var i = 0; i < flipKeyMaps.length; i++) {
        var flipKeyMap = flipKeyMaps[i];
        if (flipKeyMap.key == e.key) {
            flipKeyMap.body.ApplyForce(flipKeyMap.forceVector, flipKeyMap.positionVector);
        }
    }
});