const api_url = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2";

export async function fetchData( page = 1, limit = 10, sortBy = "id", order = "asc" ) {
    const response = await fetch( `${ api_url }/users?page=${ page }&limit=${ limit }&sortBy=${ sortBy }&order=${ order }` );
    if( )
}