import { Singleton } from "@/core/game/Singleton";

export class ParticleData extends Singleton {}

export const particleData: Readonly<ParticleData> = ParticleData.getInstance();
