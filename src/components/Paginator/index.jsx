import React, {useState} from 'react'

export default function Paginator() {
    const MAX_PAGE = 5;
    
    const [currentPage, setCurrentPage] = useState();
    const [dataSet, setDataSet] = useState([]);
    
  return (
    <ul class="pagination pagination-sm m-0">
        <li class="page-item"><a class="page-link" href="#">«</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">»</a></li>
    </ul>
  )
}
