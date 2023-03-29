import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();

  const find = (e) => {
    e.preventDefault();

    const {value} = e.target;

    if(value) nav(`/find/${value}`);
  }

  return (
    <aside className="side">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form>
            <input type="text" id="search_field" onInput={find} />
        </form>
      </div>
    </aside>
  )
}

export default Sidebar
