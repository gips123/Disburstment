'use client';

import { Navbar } from '@/partials/navbar/navbar';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MenuItem } from '@/config/types';
import { Container } from '@/components/common/container';

interface PageNavbarProps {
  menu: MenuItem[];
}
const PageNavbar: React.FC<PageNavbarProps> = ({ menu }) => {
  return (
    <Navbar>
      <Container>
        <NavbarMenu items={menu ?? []} />
      </Container>
    </Navbar>
  );
};

export { PageNavbar };
