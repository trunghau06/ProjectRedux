import React from "react";
import "../../styles/Shared/GenderBadge.css"; // CSS cho badge

export default function GenderBadge({ genre }) {
  if (!genre) return null;

  const isMale = genre.toLowerCase() === "male";
  const badgeClass = isMale ? "badge-male" : "badge-female";
  const iconClass = isMale ? "fa-mars" : "fa-venus";
  const label = isMale ? "Nam" : "Nữ";

  return (
    <span className={`gender-badge ${badgeClass}`}>
      <i className={`fa-solid ${iconClass}`}></i> {label}
    </span>
  );
}
2️⃣ CSS cơ bản GenderBadge.css
css
Sao chép mã
.gender-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-male {
  background-color: #4da6ff;
  color: white;
}

.badge-female {
  background-color: #ff4da6;
  color: white;
}

.gender-badge i {
  margin-right: 4px;
}
3️⃣ Sử dụng trong DataCard.jsx
jsx
Sao chép mã
import GenderBadge from "../Shared/GenderBadge";

// trong card-header
<GenderBadge genre={user.genre} />
4️⃣ Sử dụng trong DataTable.jsx
jsx
Sao chép mã
import GenderBadge from "../Shared/GenderBadge";

// trong cột Genre
<td>
  <GenderBadge genre={user.genre} />
</td>
✅ Như vậy:

Badge giới tính có icon + màu sắc hiển thị đồng nhất cả Card và Table.

Dễ bảo trì: nếu muốn đổi màu hoặc kiểu hiển thị, chỉ cần sửa GenderBadge.jsx / CSS.

Nếu bạn muốn, mình có thể viết luôn DataTable mới đầy đủ với badge hiển thị cho cột giới tính, nhìn sẽ giống hệt Card. Bạn có muốn mình làm không?







Is this conversation helpful so far?








