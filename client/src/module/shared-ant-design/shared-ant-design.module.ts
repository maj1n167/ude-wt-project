// Angular modules
import { NgModule } from '@angular/core';

// Ant design modules
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

const antDesignComponents = [
  NzAvatarModule,
  NzButtonModule,
  NzDividerModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzIconModule,
  NzCardModule,
  NzMessageModule,
  NzModalModule,
];

@NgModule({
  declarations: [],
  imports: antDesignComponents,
  exports: antDesignComponents,
})
export class SharedAntDesignModule {}
