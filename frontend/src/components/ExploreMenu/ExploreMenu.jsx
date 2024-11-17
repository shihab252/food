import React from 'react'
import './ExploreMenu.css'
import {menu_list} from "../../assets/frontend_assets/assets"

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Discover a variety of mouth-watering dishes crafted with the finest ingredients, each designed to satisfy your cravings. From savory appetizers to decadent desserts, our menu offers something for everyone. Whether you're looking for a light bite or a full-course meal, we've got you covered with flavors from around the world. Come and explore the delicious possibilities!</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}
        </div>
        <hr />

      
    </div>
  )
}

export default ExploreMenu
