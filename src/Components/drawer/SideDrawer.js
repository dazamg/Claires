import React from 'react'
import {Drawer, Button} from 'antd'
import {Link} from 'react-router-dom'
import jeans from "../../images/jeans.jpg";
import {useSelector, useDispatch } from "react-redux";


const SideDrawer = () => {
    const dispatch = useDispatch();
    const {drawer, cart} = useSelector((state) => ({ ...state}))

    const imgStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover'
    }
    return (
        <Drawer 
            className="text-center"
            title={`(${cart.length}) Items in the Cart`}
            placement="left"
            closable={false}
            onClose={() => {
            //when the user click anywhere on the page other than the drawer
            // the payload would fire 
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            })
        }} visible={drawer}>
            {cart.map((p) => (
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images[0] ? (
                            <>
                            <img src={p.images[0].url} alt="Side drawer product" style={imgStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        ) : (
                            <>
                            <img src={jeans} alt="Side drawer product" style={imgStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
        </Drawer>
    )
}

export default SideDrawer
