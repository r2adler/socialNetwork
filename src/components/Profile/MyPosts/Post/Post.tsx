import s from './Post.module.css'
import React from "react";

const Post = (props: any) => {
    return (
        <div className={s.item}>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3Q_jHZOfFLWc5SzH7A-xxaPcOOyDj-X8zQ&usqp=CAU'} />
            {props.message}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>
    )
}

export default Post