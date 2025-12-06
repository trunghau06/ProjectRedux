export const API_URL = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2"; // API 

export async function fetchData(page = 1, limit = 10, sortBy = "id", order = "asc") { // Xuất hàm bdb
    // Tai danh sach theo page - limit - sortField - order(Tang-Giam)
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
    if (!response.ok) throw new Error(`fetch dữ liệu thất bại: ${response.statusText}`);
    return await response.json();
}

export async function addRecord(data) {
    const response = await fetch(API_URL, {
        method : "POST",    // thông báo tạo rc mới
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Lỗi thêm record: ${response.status}`);
    return await response.json();
}