import { FC } from 'react';

import { BugButton } from 'app/provider/ErrorBoundaries';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cln from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cln.Navbar, {}, [className])}>
            <BugButton />
            <div className={cln.links}>
                <AppLink to="/">Main</AppLink>
                <AppLink className={cln.aboutLink} to="/about">About</AppLink>
                <AppLink to="/news">News</AppLink>
            </div>
        </div>
    );
};
