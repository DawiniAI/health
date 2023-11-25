import { Directive, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[remote-image]',
  host: {
    '[attr.src]': 'finalImage',
  },
  standalone: true,
})
export class ImagePreloader implements OnChanges {
  @Input('remote-image') remoteImage: string | undefined;
  downloadingImage: HTMLImageElement = new Image();
  defaultLoadingImage: string = 'assets/img/loading.gif';
  defaultOfflineImage: string = 'assets/img/medication-placeholder.webp';
  finalImage: string | undefined = this.defaultLoadingImage;

  ngOnChanges() {
    if (this.remoteImage) {
      this.downloadingImage.src = this.remoteImage;
      this.downloadingImage.onload = () => {
        //Switch To Remote Image
        this.finalImage = this.remoteImage;
      };
    }
    this.downloadingImage.onerror = () => {
      //Switch To Default Offline Image
      this.finalImage = this.defaultOfflineImage;
    };
  }
}
