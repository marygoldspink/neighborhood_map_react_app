import React from "react";

// A functional react component to render the Sidebar and its list
// The filter input raises an event to the parent component so that it
// can filter based on what the user types
// If the user clicks on a place in the list then fire that to the parent
// component too so it can highlight it in the Map.
function SidebarListView(props) {
  return (
    <aside className="sidebar">
        <h1 className="App-title">Hipster Shoreditch</h1>
        <form id="" className="sidebar-search-form" aria-label="Filter">
            <input aria-label="Filter places by name" role="search" placeholder="Type to filter places" className="sidebar-search-input" type="text" onChange={(event) => props.handleSearch(event.target.value)} />
        </form>
        <ol className="siderbar-list-view" role="region" aria-label="Matching Place list">
        {props.places.map(place => {
            return <li tabIndex="0" role="button" key={place.id} onClick={() => props.handlePlaceSelected(place)}
                       className={place.selected ? 'active': ''}>{place.label}</li>;
        })}
        </ol>
    </aside>
  );
}

export default SidebarListView;
