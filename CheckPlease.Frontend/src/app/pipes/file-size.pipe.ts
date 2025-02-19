import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  public transform(sizeInBytes: string | number | undefined | null, decimals: number = 2): string {
    if (!sizeInBytes) {
      return '0 B';
    }

    const bytes = typeof sizeInBytes === 'string' ? parseInt(sizeInBytes, 10) : sizeInBytes;

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, unitIndex);

    return `${size.toFixed(decimals)} ${units[unitIndex]}`;
  }
}
