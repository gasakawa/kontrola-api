export default interface IStorageProvider {
  saveFile: (file: string, folder: string) => Promise<string>;
}
