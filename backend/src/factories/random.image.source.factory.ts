export class RandomImageSourceFactory {
  public make(seed: string, size: number) {
    return `https://picsum.photos/seed/${seed}/${size}`;
  }
}
