import { images } from "../../Path"

function SearchForm(props){
    const { value, onChange } = props

    return (
        <form method="POST" className="search-form">
            <input type="text" value={value} placeholder="검색어를 입력해주세요." onChange={(e) => onChange(e)}/>
            <button type="submit">
                <img src={images['ico_search.svg']} alt="검색"/>
            </button>
        </form>
    )
}

export default SearchForm