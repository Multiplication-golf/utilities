export class Utilities () {
  static getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  
  static between(x, min, max) {
    return x >= min && x <= max;
  }
  
  static MathHypotenuse(x, y) {
    return Math.sqrt(x * x + y * y);
  }
  
  static mmalizeAngleRadians(angle) {
    while (angle >= Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  }
  
  static calculateTriangleVertices(cx, cy, size, angle) {
    const height = sqrt23 * size;
    const halfSize = size / 2;
  
    // Convert the angle to radians
    const angleRad = angle * pi180;
  
    // Precalculate cos and sin of the angle to avoid repeating it
    const cosAngle = Math.cos(angleRad);
    const sinAngle = Math.sin(angleRad);
  
    let vertices = [
      { x: -halfSize, y: -height / 3 },
      { x: halfSize, y: -height / 3 },
      { x: 0, y: (2 * height) / 3 },
    ];
  
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
  
      const rotatedX = vertex.x * cosAngle - vertex.y * sinAngle;
      const rotatedY = vertex.x * sinAngle + vertex.y * cosAngle;
  
      vertices[i] = { x: rotatedX + cx, y: rotatedY + cy };
    }
  
    return vertices;
  }
  
  static calculateRotatedPentagonVertices(cx, cy, r, rotation) {
    const R = r;
    const angleOffset = piby2 + rotation;
    const vertices = new Array(5);
  
    for (let i = 0; i < 5; i++) {
      const angle = (2 * pi * i) / 5 + angleOffset;
      const x = cx + R * Math.cos(angle);
      const y = cy + R * Math.sin(angle);
      vertices[i] = { x, y };
    }
  
    return vertices;
  }
  
  static calculateSquareVertices(cx, cy, size, angle) {
    var halfSize = size / 2;
  
    var angleRad = angle * pi180;
    var cosAngle = Math.cos(angleRad);
    var sinAngle = Math.sin(angleRad);
  
    let vertices = [
      { x: -halfSize, y: -halfSize },
      { x: halfSize, y: -halfSize },
      { x: halfSize, y: halfSize },
      { x: -halfSize, y: halfSize },
    ];
  
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      const rotatedX = vertex.x * cosAngle - vertex.y * sinAngle;
      const rotatedY = vertex.x * sinAngle + vertex.y * cosAngle;
      vertices[i] = { x: rotatedX + cx, y: rotatedY + cy };
    }
  
    return vertices;
  }
  
  static findBullet(id) {
    return bullets.find((bullet) => id === bullet.uniqueid);
  }
  
  static toSATPolygon(vertices, points = []) {
    const len = vertices.length;
    for (let i = 0; i < len; i++) {
      points[i] = new SAT.Vector(vertices[i].x, vertices[i].y);
    }
    return new SAT.Polygon(new SAT.Vector(0, 0), points.slice(0, len));
  }
  
  static normalizeAngle(angle) {
    return angle % 360;
  }
  
  static rotatePointAroundPlayer(cannonOffsetX, cannonOffsetY, playerRotation) {
    // Convert player rotation to radians for math
    const playerRotationRad = playerRotation * (Math.PI / 180);
  
    // Rotate cannon's offset position based on player rotation
    const rotatedX =
      cannonOffsetX * Math.cos(playerRotationRad) -
      cannonOffsetY * Math.sin(playerRotationRad);
    const rotatedY =
      cannonOffsetX * Math.sin(playerRotationRad) +
      cannonOffsetY * Math.cos(playerRotationRad);
  
    return [rotatedX, rotatedY];
  }
  
  static isTargetInSwivelRange(
    playerRotation,
    targetAngle,
    logging,
    offset_degress
  ) {
    // Normalize player's rotation and target angle
    playerRotation = normalizeAngle(playerRotation + offset_degress);
    targetAngle = normalizeAngle(targetAngle);
  
    // Define the swivel range around the player's current rotation
    const minSwivelAngle = normalizeAngle(playerRotation - 85); // 90 degrees left of player
    const maxSwivelAngle = normalizeAngle(playerRotation + 85); // 90 degrees right of player
  
    // Check if the target is within the swivel range
    if (minSwivelAngle <= maxSwivelAngle) {
      return minSwivelAngle <= targetAngle && targetAngle <= maxSwivelAngle;
    } else {
      // Handle the case where angles wrap around 0°
      return targetAngle >= minSwivelAngle || targetAngle <= maxSwivelAngle;
    }
  }
  
  static isBulletCollidingWithPolygon(circle, polygonVertices) {
    var circleSAT;
    circleSAT = new SAT.Circle(new SAT.Vector(circle.x, circle.y), circle.size);
    const polygonSAT = toSATPolygon(polygonVertices);
    var collided = SAT.testCirclePolygon(circleSAT, polygonSAT);
    return collided;
  }
  
  static isPlayerCollidingWithPolygon(circle, polygonVertices) {
    response.clear();
  
    let circleSAT = new SAT.Circle(
      new SAT.Vector(circle.x, circle.y),
      circle.size * 40
    );
    const polygonSAT = toSATPolygon(polygonVertices);
    var collided = SAT.testCirclePolygon(circleSAT, polygonSAT, response);
    return [collided, response];
  }
  
  static finder_(data) {
    let index___ = autocannons.findIndex(
      (cannon) => data._cannon.CannonID === cannon.CannonID
    );
    if (index___ !== -1) {
      let cannon = autocannons[index___];
      return [cannon, index___];
    }
    return undefined;
  }
  
  static generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  } //
  
  static rearrange() {
    if (leader_board.shown.length <= 1) {
      return;
    }
    leader_board.shown.sort(function (a, b) {
      return a.score - b.score;
    });
    leader_board.shown.reverse(); // huh
  }
  
  static confirmplayerradia(_x, _y) {
    for (const player in players) {
      let player_ = players[player];
      if (
        between(player_.x, _x - (player_.size + 50), _x + (player_.size + 50)) &&
        between(player_.y, _y - (player_.size + 50), _y + (player_.size + 50))
      ) {
        return false; // Overlap detected
      }
    }
    return true; // No overlap
  }
  
  static limitedLog(message, ...optionalParams) {
    if (logCounter < LOG_LIMIT) {
      console.log(message, ...optionalParams);
      logCounter++;
    } else if (logCounter === LOG_LIMIT) {
      console.log("Logging limit reached. Further logs will be suppressed.");
      logCounter++; // Increment one last time to stop this message from repeating
    }
  }
  
  static normalizeAngle_2(angle) {
    if (typeof angle !== "number" || isNaN(angle)) {
      limitedLog("normalizeAngle received invalid input:", angle);
      return 0; // Fallback to 0
    }
    return ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
  }
  
  static moveCannonAngle(cannon) {
    let deltaAngle = normalizeAngle_2(cannon.targetAngle - cannon.angle);
  
    let reloadStat = players[cannon.playerid]?.statsTree?.["Bullet Reload"];
  
    let denominator = 3.5 - (reloadStat - 1) / 3;
  
    let adjustment = Math.abs(deltaAngle) / denominator;
  
    cannon.angle += Math.sign(deltaAngle) * adjustment;
    cannon.angle = normalizeAngle_2(cannon.angle);
  
    emit("autoCannonUPDATE-ANGLE", {
      angle: cannon.angle,
      cannon_ID: cannon.CannonID,
    });
  }
}
