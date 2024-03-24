import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule()
export class IconsModule {
  public constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry) {
    matIconRegistry
      .addSvgIcon('menu-activity', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-activity.svg'))
      .addSvgIcon(
        'menu-administration',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-administration.svg'),
      )
      .addSvgIcon('menu-company', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-company.svg'))
      .addSvgIcon('menu-contact', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-contact.svg'))
      .addSvgIcon('menu-dashboard', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-dashboard.svg'))
      .addSvgIcon(
        'menu-instruction',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-instruction.svg'),
      )
      .addSvgIcon(
        'menu-marketing',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-marketing-list.svg'),
      )
      .addSvgIcon('menu-pitch', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-pitch.svg'))
      .addSvgIcon('menu-property', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-property.svg'))
      .addSvgIcon('menu-referral', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-referral.svg'))
      .addSvgIcon('menu-report', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-report.svg'))
      .addSvgIcon(
        'menu-requirement',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-requirement.svg'),
      )
      .addSvgIcon('menu-tenancy', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-menu-tenancy.svg'))
      .addSvgIcon('submenu-create', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-create.svg'))
      .addSvgIcon(
        'submenu-reports',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-reports.svg'),
      )
      .addSvgIcon('submenu-search', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-search.svg'))
      .addSvgIcon(
        'submenu-view',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-submenu-view-reports.svg'),
      )
      .addSvgIcon('go-back', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/go-back-icon.svg'))
      .addSvgIcon('preview', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-preview.svg'))
      .addSvgIcon('kf-logo', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/kf-logo-icon.svg'))
      .addSvgIcon(
        'map-marker-radius',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/images/map-marker-radius.svg'),
      )
      .addSvgIcon('map-marker-path', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/map-marker-path.svg'))
      .addSvgIcon('log-call', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-log-call.svg'))
      .addSvgIcon('generate-pdf', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/generate-pdf.svg'))
      .addSvgIcon('ico-users', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-users.svg'))
      .addSvgIcon('ico-folder', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ico-folder.svg'));
  }
}
