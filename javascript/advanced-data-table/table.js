
"use strict";

/*
 * KERLION Advanced Data Table
 * Version: 1.0.0
 * Features: Search, Sorting, Filtering, Pagination, CSV Export
 * No external dependencies.
 */

(function () {
    const elements = {
        tableBody: document.getElementById("tableBody"),
        searchInput: document.getElementById("searchInput"),
        roleFilter: document.getElementById("roleFilter"),
        statusFilter: document.getElementById("statusFilter"),
        pageSize: document.getElementById("pageSize"),
        resetFilters: document.getElementById("resetFilters"),
        exportCsv: document.getElementById("exportCsv"),
        totalRecords: document.getElementById("totalRecords"),
        visibleRecords: document.getElementById("visibleRecords"),
        totalPages: document.getElementById("totalPages"),
        resultInfo: document.getElementById("resultInfo"),
        pageIndicator: document.getElementById("pageIndicator"),
        prevPage: document.getElementById("prevPage"),
        nextPage: document.getElementById("nextPage"),
        emptyState: document.getElementById("emptyState")
    };

    /*
     * 1. Validate Required HTML Elements
     */

    const missingElements = Object.entries(elements)
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        console.error(
            "KERLION Data Table: Missing HTML elements:",
            missingElements.join(", ")
        );
        return;
    }

    /*
     * 2. Sample Dataset
     *
     * Replace this array with your own data.
     * All records below are fictional examples.
     */

    const records = [
        {
            id: 1001,
            name: "أحمد محمد",
            email: "ahmed@example.com",
            role: "مطور واجهات",
            status: "active",
            date: "2026-01-12"
        },
        {
            id: 1002,
            name: "سارة علي",
            email: "sara@example.com",
            role: "مصمم واجهات",
            status: "active",
            date: "2026-01-15"
        },
        {
            id: 1003,
            name: "محمد خالد",
            email: "mohamed@example.com",
            role: "مدير مشروع",
            status: "pending",
            date: "2026-01-20"
        },
        {
            id: 1004,
            name: "نور أحمد",
            email: "nour@example.com",
            role: "دعم فني",
            status: "inactive",
            date: "2026-02-03"
        },
        {
            id: 1005,
            name: "عمر حسن",
            email: "omar@example.com",
            role: "مطور JavaScript",
            status: "active",
            date: "2026-02-08"
        },
        {
            id: 1006,
            name: "مريم إبراهيم",
            email: "mariam@example.com",
            role: "محلل بيانات",
            status: "pending",
            date: "2026-02-12"
        },
        {
            id: 1007,
            name: "يوسف محمود",
            email: "youssef@example.com",
            role: "مطور واجهات",
            status: "active",
            date: "2026-03-01"
        },
        {
            id: 1008,
            name: "ليلى مصطفى",
            email: "layla@example.com",
            role: "مصمم واجهات",
            status: "inactive",
            date: "2026-03-05"
        },
        {
            id: 1009,
            name: "كريم سمير",
            email: "karim@example.com",
            role: "مدير مشروع",
            status: "active",
            date: "2026-03-11"
        },
        {
            id: 1010,
            name: "هدى محمود",
            email: "hoda@example.com",
            role: "دعم فني",
            status: "pending",
            date: "2026-03-18"
        },
        {
            id: 1011,
            name: "مصطفى علي",
            email: "mostafa@example.com",
            role: "مطور JavaScript",
            status: "active",
            date: "2026-04-02"
        },
        {
            id: 1012,
            name: "ريم حسن",
            email: "reem@example.com",
            role: "محلل بيانات",
            status: "inactive",
            date: "2026-04-09"
        },
        {
            id: 1013,
            name: "زياد أحمد",
            email: "ziad@example.com",
            role: "مطور واجهات",
            status: "pending",
            date: "2026-04-15"
        },
        {
            id: 1014,
            name: "ملك إبراهيم",
            email: "malak@example.com",
            role: "مصمم واجهات",
            status: "active",
            date: "2026-05-04"
        },
        {
            id: 1015,
            name: "حسام محمد",
            email: "hossam@example.com",
            role: "مدير مشروع",
            status: "active",
            date: "2026-05-10"
        },
        {
            id: 1016,
            name: "دينا خالد",
            email: "dina@example.com",
            role: "دعم فني",
            status: "inactive",
            date: "2026-05-16"
        },
        {
            id: 1017,
            name: "علي محمود",
            email: "ali@example.com",
            role: "مطور JavaScript",
            status: "pending",
            date: "2026-06-02"
        },
        {
            id: 1018,
            name: "ياسمين سمير",
            email: "yasmin@example.com",
            role: "محلل بيانات",
            status: "active",
            date: "2026-06-12"
        },
        {
            id: 1019,
            name: "طارق حسن",
            email: "tarek@example.com",
            role: "مطور واجهات",
            status: "active",
            date: "2026-07-03"
        },
        {
            id: 1020,
            name: "رنا مصطفى",
            email: "rana@example.com",
            role: "مصمم واجهات",
            status: "pending",
            date: "2026-07-14"
        },
        {
            id: 1021,
            name: "إبراهيم سعيد",
            email: "ibrahim@example.com",
            role: "مدير مشروع",
            status: "inactive",
            date: "2026-08-06"
        },
        {
            id: 1022,
            name: "فرح أحمد",
            email: "farah@example.com",
            role: "دعم فني",
            status: "active",
            date: "2026-08-17"
        }
    ];

    /*
     * 3. Configuration and State
     */

    const statusLabels = {
        active: "نشط",
        inactive: "غير نشط",
        pending: "قيد المراجعة"
    };

    const statusClasses = {
        active: "status-active",
        inactive: "status-inactive",
        pending: "status-pending"
    };

    const collator = new Intl.Collator("ar", {
        numeric: true,
        sensitivity: "base"
    });

    let currentPage = 1;

    let sortState = {
        key: null,
        direction: 1
    };

    /*
     * 4. Text Helpers
     */

    function normalizeText(value) {
        return String(value ?? "")
            .normalize("NFKC")
            .replace(/[\u064B-\u065F\u0670]/g, "")
            .trim()
            .toLocaleLowerCase("ar");
    }

    function escapeHTML(value) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return String(value ?? "").replace(
            /[&<>"']/g,
            character => characters[character]
        );
    }

    function formatDate(value) {
        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return new Intl.DateTimeFormat("ar-EG", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date);
    }

    /*
     * 5. Populate Role Filter
     */

    function initializeRoleFilter() {
        const roles = [...new Set(
            records.map(record => record.role)
        )].sort(collator.compare);

        roles.forEach(role => {
            const option = document.createElement("option");

            option.value = role;
            option.textContent = role;

            elements.roleFilter.appendChild(option);
        });
    }

    /*
     * 6. Search and Filtering
     */

    function getFilteredRecords() {
        const query = normalizeText(elements.searchInput.value);
        const selectedRole = elements.roleFilter.value;
        const selectedStatus = elements.statusFilter.value;

        return records.filter(record => {
            const matchesSearch = !query || [
                record.id,
                record.name,
                record.email,
                record.role,
                record.date,
                statusLabels[record.status]
            ].some(value => normalizeText(value).includes(query));

            const matchesRole =
                !selectedRole || record.role === selectedRole;

            const matchesStatus =
                !selectedStatus || record.status === selectedStatus;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }

    /*
     * 7. Sorting
     */

    function compareRecords(a, b, key) {
        if (key === "id") {
            return Number(a.id) - Number(b.id);
        }

        if (key === "date") {
            return String(a.date).localeCompare(String(b.date));
        }

        return collator.compare(
            String(a[key] ?? ""),
            String(b[key] ?? "")
        );
    }

    function getSortedRecords(data) {
        if (!sortState.key) {
            return [...data];
        }

        return [...data].sort((a, b) => {
            return compareRecords(a, b, sortState.key)
                * sortState.direction;
        });
    }

    function updateSortIndicators() {
        document.querySelectorAll(".sort-button").forEach(button => {
            const key = button.dataset.sort;
            const isActive = key === sortState.key;
            const icon = button.querySelector("span");
            const header = button.closest("th");

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

            if (icon) {
                icon.textContent = !isActive
                    ? "↕"
                    : sortState.direction === 1
                        ? "↑"
                        : "↓";
            }

            if (header) {
                header.setAttribute(
                    "aria-sort",
                    !isActive
                        ? "none"
                        : sortState.direction === 1
                            ? "ascending"
                            : "descending"
                );
            }
        });
    }

    /*
     * 8. Safe Row Rendering
     */

    function createRow(record) {
        const statusClass =
            statusClasses[record.status] || "status-pending";

        const statusLabel =
            statusLabels[record.status] || "غير معروف";

        return `
            <tr>
                <td>${escapeHTML(record.id)}</td>
                <td>${escapeHTML(record.name)}</td>
                <td>
                    <a href="mailto:${encodeURIComponent(record.email)}">
                        ${escapeHTML(record.email)}
                    </a>
                </td>
                <td>${escapeHTML(record.role)}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusLabel}
                    </span>
                </td>
                <td>${escapeHTML(formatDate(record.date))}</td>
            </tr>
        `;
    }

    /*
     * 9. Statistics and Pagination
     */

    function updateStatistics(filteredCount, pageCount, visibleCount) {
        elements.totalRecords.textContent =
            records.length.toLocaleString("ar-EG");

        elements.visibleRecords.textContent =
            visibleCount.toLocaleString("ar-EG");

        elements.totalPages.textContent =
            pageCount.toLocaleString("ar-EG");
    }

    function updatePagination(totalPages, start, end, totalFiltered) {
        elements.pageIndicator.textContent =
            `${currentPage} / ${totalPages}`;

        elements.prevPage.disabled = currentPage <= 1;
        elements.nextPage.disabled =
            totalPages === 0 || currentPage >= totalPages;

        if (totalFiltered === 0) {
            elements.resultInfo.textContent =
                "لا توجد سجلات مطابقة لعملية البحث.";

            return;
        }

        elements.resultInfo.textContent =
            `عرض ${start + 1}–${end} من ${totalFiltered} سجلًا`;
    }

    /*
     * 10. Main Rendering Function
     */

    function renderTable() {
        const filtered = getFilteredRecords();
        const sorted = getSortedRecords(filtered);

        const pageSize = Math.max(
            1,
            Number(elements.pageSize.value) || 10
        );

        const pageCount = Math.ceil(sorted.length / pageSize);

        if (pageCount === 0) {
            currentPage = 1;
        } else if (currentPage > pageCount) {
            currentPage = pageCount;
        }

        const start = (currentPage - 1) * pageSize;

        const pageRecords = sorted.slice(
            start,
            start + pageSize
        );

        const end = start + pageRecords.length;

        elements.tableBody.innerHTML = pageRecords
            .map(createRow)
            .join("");

        elements.emptyState.hidden = sorted.length > 0;

        elements.exportCsv.disabled = sorted.length === 0;

        updateStatistics(
            sorted.length,
            pageCount,
            pageRecords.length
        );

        updatePagination(
            pageCount,
            start,
            end,
            sorted.length
        );

        updateSortIndicators();
    }

    /*
     * 11. CSV Export
     *
     * Exports all currently filtered records,
     * not only the visible page.
     */

    function escapeCSV(value) {
        let text = String(value ?? "");

        // Reduce spreadsheet formula injection risk.
        if (/^[\s]*[=+\-@]/.test(text)) {
            text = "'" + text;
        }

        return `"${text.replace(/"/g, '""')}"`;
    }

    function exportToCSV() {
        const filtered = getSortedRecords(getFilteredRecords());

        if (filtered.length === 0) {
            return;
        }

        const headers = [
            "الرقم",
            "الاسم",
            "البريد الإلكتروني",
            "الوظيفة",
            "الحالة",
            "تاريخ التسجيل"
        ];

        const rows = filtered.map(record => [
            record.id,
            record.name,
            record.email,
            record.role,
            statusLabels[record.status] || "غير معروف",
            record.date
        ]);

        const csvContent = [
            headers,
            ...rows
        ].map(row => {
            return row.map(escapeCSV).join(",");
        }).join("\r\n");

        // UTF-8 BOM helps spreadsheet software display Arabic correctly.
        const blob = new Blob(
            ["\uFEFF", csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        const today = new Date().toISOString().slice(0, 10);

        link.href = url;
        link.download = `kerlion-data-table-${today}.csv`;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    /*
     * 12. Event Listeners
     */

    elements.searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderTable();
    });

    elements.roleFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable();
    });

    elements.statusFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable();
    });

    elements.pageSize.addEventListener("change", () => {
        currentPage = 1;
        renderTable();
    });

    elements.prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    elements.nextPage.addEventListener("click", () => {
        const count = getFilteredRecords().length;
        const pageSize = Math.max(
            1,
            Number(elements.pageSize.value) || 10
        );

        const pageCount = Math.ceil(count / pageSize);

        if (currentPage < pageCount) {
            currentPage++;
            renderTable();
        }
    });

    elements.resetFilters.addEventListener("click", () => {
        elements.searchInput.value = "";
        elements.roleFilter.value = "";
        elements.statusFilter.value = "";
        elements.pageSize.value = "10";

        sortState = {
            key: null,
            direction: 1
        };

        currentPage = 1;
        renderTable();
    });

    elements.exportCsv.addEventListener("click", exportToCSV);

    document.querySelectorAll(".sort-button").forEach(button => {
        button.addEventListener("click", () => {
            const key = button.dataset.sort;

            if (!key) {
                return;
            }

            if (sortState.key === key) {
                sortState.direction *= -1;
            } else {
                sortState.key = key;
                sortState.direction = 1;
            }

            currentPage = 1;
            renderTable();
        });
    });

    /*
     * 13. Initialization
     */

    function initialize() {
        initializeRoleFilter();

        const yearElement = document.getElementById("currentYear");

        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        renderTable();
    }

    initialize();

})();
