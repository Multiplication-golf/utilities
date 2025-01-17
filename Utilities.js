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

  static mix(rgb, rgb2, percent, ...otherrgbs) {
    let _return = false;
    rgb.forEach((f) => {
      if (typeof f !== "number") _return = true;
    });
    rgb2.forEach((f) => {
      if (typeof f !== "number") _return = true;
    });
    if (rgb.length !== 3 || rgb2.length !== 3) _return = true;
    if (_return) throw new Error("Bad rgbs");
    var newrgb = rgb.map((c, i) => {
      return (c = rgb2[i] * percent + c * (1 - percent));
    });
    otherrgbs.forEach((rgb, i) => {
      mix(rgb, otherrgbs[i], percent);
    });
    return newrgb;
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
  
  static rearrange(leader_board) {
    if (leader_board.length <= 1) {
      return;
    }
    leader_board.sort(function (a, b) {
      return a.score - b.score;
    });
    leader_board.reverse(); // huh
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
  
  static class leaderboard() {
    constructor (leaderboardLength) {
      this.public = []
      this.hidden = []
      this.leaderboardLength = leaderboardLength
    }

    addplayer(id,score,...meta) {
      if (this.public.length <= 10) {
        this.public.push({id:id,score:score,...meta});
      }
      this.hidden.push({id:id,score:score,...meta});
    }
  
    sort() {
      this.public = this.public.sort(function (a, b) {
        return b.score - a.score;
      });
      this.hidden = this.hidden.sort(function (a, b) {
        return b.score - a.score;
      });
    }
  
    addscore(id,score) {
      let player = this.hidden.find((entre) => id === entre.id)
      player.score += score;
      let player2 = this.public.find((entre) => id === entre.id)
      if (!player2) {
        this.public.push(player)
        this.sort()
        this.public = this.public.slice(0, this.leaderboardLength)
      } else {
        player2.score += score
        this.sort()
        this.public = this.public.slice(0, this.leaderboardLength)
      }
    }
  
    removeplayer(id) {
      let player = this.hidden.find((entre) => id === entre.id)
      if (player) {
        this.hidden = this.hidden.splice(this.hidden.indexOf(player),1)
      }
      let player2 = this.public.find((entre) => id === entre.id)
      if (player2) {
        this.public = this.public.splice(this.public.indexOf(player2),1)
      }
    }
    get hidden() {
      return this.hidden
    }
    get public() {
      return this.public
    }
    get full() {
      return {public:this.public,hidden:this.hidden}
    }
  }
}
