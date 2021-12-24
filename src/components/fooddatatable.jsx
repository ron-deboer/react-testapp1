import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FoodDataTable(props) {
    let navigate = useNavigate();
    const initialConfig = {
        rowsperpage: 20,
        pagenum: 1,
        pagedata: [],
        filter: '',
    };
    const [config, setConfig] = useState(initialConfig);

    useEffect(() => {
        loadPageData(config);
    }, [props.data]);

    const pageNav = (direction) => {
        let cfg = Object.assign({}, config);
        if (direction === 'next') {
            cfg.pagenum++;
        } else if (direction === 'prev') {
            cfg.pagenum--;
        }
        loadPageData(cfg);
    };

    const rowsPerPage = (lines) => {
        let cfg = { ...config, rowsperpage: lines };
        loadPageData(cfg);
    };

    const loadPageData = (cfg) => {
        let newcfg = Object.assign({}, cfg);
        const pgstart = (newcfg.pagenum - 1) * newcfg.rowsperpage;
        const pgend = pgstart + newcfg.rowsperpage;
        newcfg.pagedata = props.data.slice(pgstart, pgend);
        setConfig(newcfg);
    };

    const editRow = (food) => {
        navigate('/addfood:' + food.id);
    };

    return (
        <div className="container table-container">
            <div className="row">
                <div className="col-1 is-vertical-align">
                    <select
                        className="inline"
                        defaultValue="20"
                        onChange={(ev) => rowsPerPage(ev.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </div>
                <div className="col-2 is-vertical-align">
                    <label>entries per page</label>
                </div>
                <div className="col-9 is-right">
                    <input className="col-3" placeholder="Filter ..." defaultValue="" />
                </div>
            </div>
            <table id="usertable" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Calories per 100g</th>
                        <th>Carbs per 100g</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {config.pagedata.map((item, index) => (
                        <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.name}</td>
                            <td>{item.calories}</td>
                            <td>{item.carbs}</td>
                            <td>
                                <div
                                    className="tag bg-primary text-white is-small"
                                    onClick={() => editRow(item)}
                                >
                                    Edit
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row is-full-width is-right pagination">
                <div className="col-1 pagenav" onClick={() => pageNav('prev')}>
                    {' '}
                    &#9664;{' '}
                </div>
                <div className="col-1"> PAGE : {config.pagenum} </div>
                <div className="col-1 pagenav" onClick={() => pageNav('next')}>
                    {' '}
                    &#9654;{' '}
                </div>
            </div>
        </div>
    );
}
