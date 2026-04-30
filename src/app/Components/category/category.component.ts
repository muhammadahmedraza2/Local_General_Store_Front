import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  filtered: any[] = [];
  showModal = false;
  isEdit = false;
  editId: any = null;
  selectedFile: File | null = null;
  previewUrl: string = '';

  form = {
    name: '',
    desc: '',
    status: 'Active'
  };

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res;
        this.filtered = [...res];
      },
      error: (err) => console.error(err)
    });
  }

  get totalCount() { return this.categories.length; }
  get activeCount() { return this.categories.filter(c => c.status === 'Active').length; }
  get inactiveCount() { return this.categories.filter(c => c.status === 'Inactive').length; }

  search(event: any) {
    const val = event.target.value.toLowerCase();
    this.filtered = this.categories.filter(c =>
      c.name.toLowerCase().includes(val)
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => { this.previewUrl = e.target.result; };
      reader.readAsDataURL(file);
    }
  }

  openAddModal() {
    this.isEdit = false;
    this.editId = null;
    this.form = { name: '', desc: '', status: 'Active' };
    this.previewUrl = '';
    this.selectedFile = null;
    this.showModal = true;
  }
  openEditModal(cat: any) {
    this.isEdit = true;
    this.editId = cat.id;
    this.form = {
      name: cat.name,
      desc: cat.description,
      status: cat.status
    };

    // ✅ Yeh fix karo — pura URL banao
    this.previewUrl = cat.imageUrl
      ? 'http://localhost:5000/Uploads/' + cat.imageUrl
      : '';

    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  saveCategory() {
    if (!this.form.name.trim()) {
      alert('Category name is required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('description', this.form.desc);
    formData.append('status', this.form.status);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEdit) {
      this.categoryService.update(this.editId, formData).subscribe({
        next: () => { this.loadCategories(); this.closeModal(); },
        error: (err) => console.error(err)
      });
    } else {
      this.categoryService.create(formData).subscribe({
        next: () => { this.loadCategories(); this.closeModal(); },
        error: (err) => console.error(err)
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error(err)
      });
    }
  }

  getImageUrl(imageUrl: string) {
    return imageUrl
      ? 'http://localhost:5000/Uploads/' + imageUrl
      : null;
  }
}
