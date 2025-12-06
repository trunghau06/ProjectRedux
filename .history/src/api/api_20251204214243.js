export const API_URL = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2"; 

export async function fetchData(page = 1, limit = 10, sortBy = "id", order = "asc") {
    const response = await fetch( `${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
    if (!response.ok) throw new Error(`fetch dữ liệu thất bại: ${response.statusText}`);
    return await response.json();
}

export async function addRecord(data) {
    const response = await fetch(API_URL, {
        method : "POST",    // yêu cầu mới
        headers: { "Content-Type": "application/json" },    // định dạng JSON
        body   : JSON.stringify(data)   // chuyển data thành chuỗi JSON
    });
    if (!response.ok) throw new Error(`Lôi: ${response.status}`);
    return await response.json();
}


