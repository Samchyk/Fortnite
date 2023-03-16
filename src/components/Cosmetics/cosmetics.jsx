import React from 'react';
import s from './cosmetics.module.css';





function Cosmetics({ cosmetics, handleItemClick }) {

  return (
      <ul className={s.items}>
        {cosmetics.map(cosmetic => (
          <li
            className={s.item}
            key={cosmetic.id}
            onClick={() => handleItemClick(cosmetic.id)}
          >
            <img
              className={s.img}
              src={cosmetic.images.icon}
              alt={cosmetic.name}
            />
            <p className={s.title}> {cosmetic.name}</p>
          </li>
        ))}
      </ul>
  );
}

export default Cosmetics;
