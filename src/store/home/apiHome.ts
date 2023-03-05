import api from "@/api";

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function fetchMembers() {
  return api.getMembersList()
}
