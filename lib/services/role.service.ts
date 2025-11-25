import '@/lib/init';
import Role, { IRole } from '@/models/role.model';

export async function getAllRoles(): Promise<IRole[]> {
  try {
    // Chuyển đổi _id từ ObjectId sang string và loại bỏ các trường không cần thiết
    const roles = await Role.find({}).sort({ level: 1 }).lean()
    if (!roles) return [];
    return roles.map(el => ({
      ...el,
      _id: el._id.toString(),
    }));
  } catch (error) {
    console.error('Lỗi khi lấy danh sách roles:', error);
    throw new Error('Không thể lấy danh sách roles');
  }
}

export async function getRoleByName(name: string): Promise<IRole | null> {
  try {
    const role = await Role.findOne({ name }).lean();

    if (!role) return null;

    return role;
  } catch (error) {
    console.error(`Lỗi khi lấy role với tên ${name}:`, error);
    throw new Error(`Không thể lấy role với tên ${name}`);
  }
}

export async function createRole(roleData: Partial<IRole>): Promise<IRole> {
  try {
    const role = new Role(roleData);
    await role.save();
    return role.toObject();
  } catch (error) {
    console.error('Lỗi khi tạo role mới:', error);
    throw new Error('Không thể tạo role mới');
  }
}

export async function updateRole(id: string, roleData: Partial<IRole>): Promise<IRole | null> {
  try {
    return await Role.findByIdAndUpdate(id, roleData, { new: true }).lean();
  } catch (error) {
    console.error(`Lỗi khi cập nhật role với id ${id}:`, error);
    throw new Error(`Không thể cập nhật role`);
  }
}

export async function deleteRole(id: string): Promise<boolean> {
  try {
    const result = await Role.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.error(`Lỗi khi xóa role với id ${id}:`, error);
    throw new Error(`Không thể xóa role`);
  }
}
