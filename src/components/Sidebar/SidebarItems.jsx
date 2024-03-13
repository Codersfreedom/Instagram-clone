import React from 'react'
import Home from './Home'
import Search from './Search'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import CreatePost from './CreatePost'

const SidebarItems = () => {
  return (
    <>
      <Home/>
      <Search/>
      <Notifications/>
      <CreatePost/>
      <ProfileLink/>
    </>
  )
}

export default SidebarItems
