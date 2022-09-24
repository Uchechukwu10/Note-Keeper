import { React, useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BiNotepad } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const NavBar = (props) => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = (event, cat) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    props.displayCategory(cat);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }


  return (
    <section className="navigation-bar md:px-9 lg:px-9 xl:px-16">
      <nav className="">
        <div className="mx-auto px-4 md:py-3 lg:py-4">
          <div className="flex justify-between">
            <div>
              {/* Website Logo */}
              <a href="#" className="flex items-center py-4 px-2">
                <BiNotepad color='white' fontSize='2.2rem'/>
                <h1 className='text-white font-bold text-4xl ml-1'>Note Keeper</h1>
              </a>
            </div>
            <div className="flex space-x-7">
              {/* Secondary Navbar items */}
              <Stack direction="row" spacing={2}>
                <div>
                  <div
                    ref={anchorRef}
                    id="composition-button"
                    onClick={handleToggle}
                    className="text-white py-5 text-xl cursor-pointer"
                  >
                    Categories
                    <RiArrowDropDownLine color='white' fontSize='2rem' style={{ display: "inline" }}/>
                  </div>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper className='category-paper'>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                            >
                              <MenuItem name='personal' onClick={(event) => handleClick(event, 'personal')}>Personal</MenuItem>
                              <MenuItem name='work'onClick={(event) => handleClick(event, 'work')}>Work</MenuItem>
                              <MenuItem name='school' onClick={(event) => handleClick(event, 'school')}>School</MenuItem>
                              <Divider />
                              <MenuItem name='all' onClick={(event) => handleClick(event, 'all')}>All</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>
            </div>
            {/* Mobile menu button  */}
            <div
              className="lg:hidden flex items-center"
              onClick={() => setMenu(true)}
            >
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            {/* Mobile Menu */}
            <div
              className={
                menu
                  ? "flex justify-center items-center mobile-menu mobile-popup"
                  : "hidden"
              }
            >
              <div className="close-btn" onClick={() => setMenu(false)}><MdClose /></div>
              <div >
                <div className="primary-link">
                  <a href="/" className="block text-xl px-2 py-4 text-white text-center">
                    Home
                  </a>
                </div>
                <div className="primary-link">
                  <a href="#" className="block text-xl px-2 py-4 text-white text-center">
                    Personal
                  </a>
                </div>
                <div className="primary-link">
                  <a href="#" className="block text-xl px-2 py-4 text-white text-center">
                    Work
                  </a>
                </div>
                <div className="primary-link">
                  <a href="#" className="block text-xl px-2 py-4 text-white text-center">
                    School
                  </a>
                </div>
                  
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;