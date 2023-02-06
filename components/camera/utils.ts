import {
  MotionValue,
  motionValue,
  animate,
  AnimationOptions,
} from "framer-motion";

const DEFAULT_PAN_TRANSITON: AnimationOptions<number> = {
  type: "spring",
  damping: 15,
  mass: 0.1,
  stiffness: 100,
  restDelta: 0.001,
};

const DEFAULT_ZOOM_TRANSITON: AnimationOptions<number> = {
  type: "spring",
  damping: 12,
  mass: 0.3,
  stiffness: 100,
  restDelta: 0.001,
};

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other: Vector) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  multiplyScalar(factor: number) {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  distanceTo(other: Vector) {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}

enum PointType {
  Center = "center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
}

function getElementPoint(el: HTMLElement, pointType: PointType): Vector {
  const rect = el.getBoundingClientRect();
  switch (pointType) {
    case PointType.Center:
      return new Vector(rect.x + rect.width / 2, rect.y + rect.height / 2);
    case PointType.TopLeft:
      return new Vector(rect.x, rect.y);
    case PointType.TopRight:
      return new Vector(rect.x + rect.width, rect.y);
    case PointType.BottomLeft:
      return new Vector(rect.x, rect.y + rect.height);
    case PointType.BottomRight:
      return new Vector(rect.x + rect.width, rect.y + rect.height);
  }
}

export class Camera {
  containerEl: any;
  contentEl: any;
  motionValues: {
    zoom: MotionValue<number>;
    posX: MotionValue<number>;
    posY: MotionValue<number>;
  };

  constructor() {
    this.motionValues = {
      posX: motionValue(0),
      posY: motionValue(0),
      zoom: motionValue(1),
    };
  }

  get position() {
    return new Vector(
      this.motionValues.posX.get(),
      this.motionValues.posY.get()
    );
  }

  get zoom() {
    return this.motionValues.zoom.get();
  }

  panTo(
    position: Vector,
    transition: AnimationOptions<number> = DEFAULT_PAN_TRANSITON
  ) {
    animate(this.motionValues.posX, position.x, transition);
    animate(this.motionValues.posY, position.y, transition);
  }

  setZoom(
    zoom: number,
    transition: AnimationOptions<number> = DEFAULT_ZOOM_TRANSITON
  ) {
    animate(this.motionValues.zoom, zoom, transition);
  }
}

export class CameraTarget {
  el: any;
  camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
  }

  getPoint(pointType: PointType) {
    const targetCenter = getElementPoint(this.el, pointType);
    const containerCenter = getElementPoint(
      this.camera.containerEl,
      PointType.Center
    );
    const targetOffset = targetCenter
      .clone()
      .sub(containerCenter)
      .multiplyScalar(1 / this.camera.zoom);
    return this.camera.position.clone().add(targetOffset);
  }

  get center(): Vector {
    return this.getPoint(PointType.Center);
  }

  get topLeft(): Vector {
    return this.getPoint(PointType.TopLeft);
  }

  get topRight(): Vector {
    return this.getPoint(PointType.TopRight);
  }

  get bottomLeft(): Vector {
    return this.getPoint(PointType.BottomLeft);
  }

  get bottomRight(): Vector {
    return this.getPoint(PointType.BottomRight);
  }
}
