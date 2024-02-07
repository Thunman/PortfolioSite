export type CircleProps = {
	color: string;
	id: number;
	x: number;
	y: number;
	radius: number;
};
export type GameStateProps = {
	start: boolean;
	keys: Set<string>;
	balls: BallProps[];
	bricks: BrickProps[];
	powerUps: PowerUpProps[];
	lasers: LaserProps[];
	paddle: PaddleProps;
	flags: FlagProps;
	lastTime: number;
	timeStamp: number;
};
export type BallProps = {
	type: string;
	color: string;
	id: number;
	position: {
		x: number;
		y: number;
	};
	size: number;
	speed: number;
	velocity: {
		x: number;
		y: number;
	};
};
export type LaserProps = {
	type: string;
	color: string;
	id: number;
	position: {
		x: number;
		y: number;
	};
	width: number;
	height: number;
	size: number;
	speed: number;
	velocity: {
		y: number;
		x: number;
	};
};

export type PaddleProps = {
	color: string;
	position: {
		x: number;
		y: number;
	};
	width: number;
	height: number;
	hasGuns: boolean;
	ammo: number;
	activateLaser: () => void;
	fireGuns: () => void;
};

export type GameProgressProps = {
	level: number;
};

export type BrickProps = {
	id: number;
	hp: number;
	width: number;
	height: number;
	getColor: () => string;
	position: {
		x: number;
		y: number;
	};
};

export type EmptyBrickProps = {
	id: number;
	hp: number;
	width: number;
	height: number;
	getColor: () => string;
	handleLeftClick: () => void;
	handleRightClick: () => void;
	position: {
		x: number;
		y: number;
	};
};

export type PowerUpProps = {
	text: string;
	type: string;
	color: string;
	id: number;
	position: {
		x: number;
		y: number;
	};
	size: number;
	speed: number;
	velocity: {
		y: number;
	};
};

export type BrickSettingsProps = {
	_padding: number;
	_width: number;
	_height: number;
	_spacing: number;
};
export type FlagProps = {
	launchBall: boolean;
	debuggMode: boolean;
};
