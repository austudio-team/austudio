import React, { useCallback, useRef, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@redux/reducers'
import { isMenuOpenedSelector, isThisMenuOpenedSelector } from '@redux/selectors/menu';
import { closeMenu, openMenu } from '@redux/actions/menu';
import { MenuItemType } from '@constants';
import { MenuEntry, MenuDropdown, MenuDropdownDivider, MenuDropdownItem } from '@components/styled';
import eventEmitter from '@utils/event';

export interface MenuItemProps {
  menu: MenuItemType;
}

const mapState = (state: RootState, ownProps: MenuItemProps) => ({
  hasMenuOpened: isMenuOpenedSelector(state.menu),
  selfOpened: isThisMenuOpenedSelector(state.menu, ownProps.menu.key),
});

const mapDispatch = {
  closeMenu,
  openMenu,
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & MenuItemProps;

const MenuItem: React.FC<Props> = props => {
  const { menu, hasMenuOpened, selfOpened, openMenu, closeMenu } = props;
  const disableHover = useRef(false);
  const container = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (selfOpened || !hasMenuOpened || disableHover.current) return;
    openMenu(menu.key);
  }, [hasMenuOpened, selfOpened, menu, openMenu]);

  const handleMouseLeave = useCallback(() => {
    disableHover.current = false;
  }, []);

  const handleEntryClick = useCallback(() => {
    selfOpened ? closeMenu() : openMenu(menu.key);
    disableHover.current = true;
  }, [selfOpened, menu, openMenu, closeMenu]);

  // clickOutsideEffect
  useEffect(() => {
    if (selfOpened) {
      const detect = (e: MouseEvent) => {
        if (!container.current) return;
        !container.current.contains((e.target as any)) && closeMenu();
      };
      window.addEventListener('mousedown', detect);
      return () => {
        window.removeEventListener('mousedown', detect);
      };
    }
    return () => {};
  }, [selfOpened, closeMenu]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    eventEmitter.emit(e.currentTarget.dataset['action']!);
    closeMenu();
  }, [closeMenu]);

  return (
    <div ref={container} style={{ position: 'relative' }}>
      <MenuEntry
        isActive={selfOpened}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleEntryClick}
      >
        {menu.name}
      </MenuEntry>
      <MenuDropdown isActive={selfOpened}>
        {menu.items.map(v => {
          return v.name === 'divider' ?
            <MenuDropdownDivider key={v.key} /> :
            <MenuDropdownItem onClick={handleClick} data-action={v.action} key={v.key}>{v.name}</MenuDropdownItem>;
        })}
      </MenuDropdown>
    </div>
  );
};

export default connector(MenuItem);
