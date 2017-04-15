import React from 'react';
import { observer } from "mobx-react"; 

@observer
export default class groupProductList extends React.Component{
    
    render(){
        
        return <div>
                <h2>Expenditure</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Food</td>
                              <td>40</td>
                          </tr>
                          <tr>
                              <td>Food</td>
                              <td>40</td>
                          </tr>
                          <tr>
                              <td>Food</td>
                              <td>40</td>
                          </tr>
                          <tr>
                              <td>Food</td>
                              <td>40</td>
                          </tr>
                      </tbody>
                  </table>

            </div>
    }
}