const Filter = ({ filter, setFilter, setSort }) => {
  return (
        <div className="Filter">
        <h2>Filtrar:</h2>
        <div className="filter-options">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="completed">Completas</option>            
                <option value="incomplete">Incompletas</option>
            </select>
        </div>
        <div>
            <h2 className="OA">Ordem alfabética</h2>
            <button className="AZ" onClick={() => setSort('AZ')}>A-Z</button>
            <button className="ZA" onClick={() => setSort('ZA')}>Z-A</button>
        </div>
    </div>
  )
}

export default Filter
