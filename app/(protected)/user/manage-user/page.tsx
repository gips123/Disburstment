import { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { ToolbarActions, ToolbarHeading } from '@/components/common/toolbar';
import {
  Toolbar,
  ToolbarDescription,
  ToolbarPageTitle,
} from '@/app/components/partials/common/toolbar';
import { Teams } from '../../components/content';
import { NetworkUserTableTeamCrewContent } from './content';

const ManageUsers = () => {
  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              <div className="flex items-center flex-wrap gap-1.5 font-medium">
                <span className="text-base text-secondary-foreground">
                  All Members:
                </span>
                <span className="text-base text-foreground font-medium me-2">
                  49,053
                </span>
                <span className="text-base text-secondary-foreground">
                  Pro Licenses
                </span>
                <span className="text-base text-foreground font-medium">
                  724
                </span>
              </div>
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">Import CSV</Button>
            <Link href={'/user/add-user'}>
              <Button variant="primary">Add Member</Button>
            </Link>
          </ToolbarActions>
        </Toolbar>
      </Container>

      <Container>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
};

export default ManageUsers;
