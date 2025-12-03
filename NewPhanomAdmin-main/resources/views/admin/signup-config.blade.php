{{-- resources/views/admin/signup-config.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Signup Form Configuration</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      <div class="row">
        <div class="col-12">
          <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column mb-3">
            <div class="flex-grow-1">
              <h4 class="fs-18 text-uppercase fw-bold m-0"><i class="ti ti-forms me-2"></i>Signup Form Configuration</h4>
              <p class="text-muted mb-0 small">Manage signup form fields and categories</p>
            </div>
          </div>
        </div>
      </div>

      {{-- Tabs --}}
      <ul class="nav nav-tabs mb-4" id="configTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="fields-tab" data-bs-toggle="tab" data-bs-target="#fields" type="button">
            <i class="ti ti-list me-1"></i>Form Fields
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button">
            <i class="ti ti-category me-1"></i>Categories & Subcategories
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview" type="button">
            <i class="ti ti-eye me-1"></i>Preview
          </button>
        </li>
      </ul>

      {{-- Tab Content --}}
      <div class="tab-content" id="configTabContent">
        
        {{-- Form Fields Tab --}}
        <div class="tab-pane fade show active" id="fields" role="tabpanel">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Form Field Management</h5>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addFieldModal">
                <i class="ti ti-plus me-1"></i>Add Field
              </button>
            </div>
            <div class="card-body">
              <p class="text-muted small mb-4">Manage the fields that appear in the signup form. Drag to reorder, toggle to enable/disable, or click edit to modify.</p>
              
              @php
                $stepNames = [1 => 'Step 1: Signup', 2 => 'Step 2: Description', 3 => 'Step 3: Upload Category', 4 => 'Step 4: Experience'];
              @endphp
              
              @foreach($stepNames as $stepNum => $stepName)
              <div class="mb-4">
                <h6 class="text-primary border-bottom pb-2 mb-3">
                  <i class="ti ti-circle-{{ $stepNum }} me-1"></i>{{ $stepName }}
                </h6>
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead class="table-light">
                      <tr>
                        <th style="width: 50px;"></th>
                        <th>Field Name</th>
                        <th>Label</th>
                        <th>Type</th>
                        <th style="width: 100px;">Required</th>
                        <th style="width: 100px;">Active</th>
                        <th style="width: 120px;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="fieldsList{{ $stepNum }}">
                      @foreach($formFields->where('step_number', $stepNum) as $field)
                      <tr data-field-id="{{ $field->id }}">
                        <td class="text-center text-muted"><i class="ti ti-grip-vertical"></i></td>
                        <td><code>{{ $field->field_name }}</code></td>
                        <td>{{ $field->field_label }}</td>
                        <td>
                          <span class="badge bg-secondary">{{ $field->field_type }}</span>
                        </td>
                        <td>
                          <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" 
                                   {{ $field->is_required ? 'checked' : '' }}
                                   onchange="toggleFieldRequired({{ $field->id }}, this.checked)">
                          </div>
                        </td>
                        <td>
                          <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" 
                                   {{ $field->is_active ? 'checked' : '' }}
                                   onchange="toggleFieldActive({{ $field->id }}, this.checked)">
                          </div>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-outline-primary me-1" 
                                  onclick="editField({{ json_encode($field) }})">
                            <i class="ti ti-edit"></i>
                          </button>
                          <button class="btn btn-sm btn-outline-danger" 
                                  onclick="deleteField({{ $field->id }})">
                            <i class="ti ti-trash"></i>
                          </button>
                        </td>
                      </tr>
                      @endforeach
                      @if($formFields->where('step_number', $stepNum)->count() === 0)
                      <tr>
                        <td colspan="7" class="text-center text-muted py-3">No fields configured for this step</td>
                      </tr>
                      @endif
                    </tbody>
                  </table>
                </div>
              </div>
              @endforeach
            </div>
          </div>
        </div>

        {{-- Categories Tab --}}
        <div class="tab-pane fade" id="categories" role="tabpanel">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Category / Subcategory Management</h5>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                <i class="ti ti-plus me-1"></i>Add Category
              </button>
            </div>
            <div class="card-body">
              <p class="text-muted small mb-4">Manage the categories and subcategories for the signup form dropdown. When a user selects a category, the corresponding subcategories will be displayed.</p>
              
              <div class="row g-4">
                @forelse($categories as $category)
                <div class="col-md-6 col-lg-4">
                  <div class="card border h-100">
                    <div class="card-header bg-light d-flex justify-content-between align-items-center py-2">
                      <h6 class="mb-0 fw-semibold">{{ $category->category_name }}</h6>
                      <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-primary" onclick="editCategory({{ $category->id }}, '{{ addslashes($category->category_name) }}', {{ json_encode($category->subcategories) }})">
                          <i class="ti ti-edit"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="deleteCategory({{ $category->id }})">
                          <i class="ti ti-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body py-2">
                      <div class="d-flex flex-wrap gap-1">
                        @foreach($category->subcategories ?? [] as $sub)
                          <span class="badge bg-primary bg-opacity-10 text-primary">{{ $sub }}</span>
                        @endforeach
                      </div>
                    </div>
                    <div class="card-footer bg-white py-2 small text-muted">
                      {{ count($category->subcategories ?? []) }} subcategories
                    </div>
                  </div>
                </div>
                @empty
                <div class="col-12">
                  <div class="text-center py-5">
                    <i class="ti ti-category text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
                    <h5 class="mt-3 text-muted">No Categories Yet</h5>
                    <p class="text-muted">Add categories to enable the Category/Subcategory dropdowns in the signup form</p>
                  </div>
                </div>
                @endforelse
              </div>
            </div>
          </div>
        </div>

        {{-- Preview Tab --}}
        <div class="tab-pane fade" id="preview" role="tabpanel">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white">
              <h5 class="mb-0">Form Preview</h5>
            </div>
            <div class="card-body">
              <p class="text-muted mb-4">Preview how the signup form will look with the current configuration:</p>
              
              <div class="row g-3" style="max-width: 700px;">
                @foreach($formFields->where('is_active', true)->sortBy(['step_number', 'sort_order']) as $field)
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    {{ $field->field_label }} 
                    @if($field->is_required)<span class="text-danger">*</span>@endif
                  </label>
                  @if($field->field_type == 'select')
                    <select class="form-select" disabled>
                      <option>{{ $field->placeholder ?: 'Select option' }}</option>
                    </select>
                  @elseif($field->field_type == 'textarea')
                    <textarea class="form-control" rows="2" placeholder="{{ $field->placeholder }}" disabled></textarea>
                  @else
                    <input type="{{ $field->field_type }}" class="form-control" placeholder="{{ $field->placeholder }}" disabled>
                  @endif
                </div>
                @endforeach
              </div>

              <div class="alert alert-info mt-4 d-flex align-items-center">
                <i class="ti ti-info-circle fs-4 me-2"></i>
                <div>
                  <strong>Note:</strong> The frontend signup form will fetch these configurations via API
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <x-partials.footer />
  </div>

  {{-- Add Field Modal --}}
  <div class="modal fade" id="addFieldModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title"><i class="ti ti-plus me-2"></i>Add New Field</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="addFieldForm" onsubmit="saveField(event)">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Step <span class="text-danger">*</span></label>
              <select class="form-select" id="fieldStep" required>
                <option value="1">Step 1: Signup</option>
                <option value="2">Step 2: Description</option>
                <option value="3">Step 3: Upload Category</option>
                <option value="4">Step 4: Experience</option>
              </select>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Field Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="fieldName" required placeholder="e.g., linkedIn">
                <small class="text-muted">No spaces, use camelCase</small>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Field Label <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="fieldLabel" required placeholder="e.g., LinkedIn URL">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Field Type <span class="text-danger">*</span></label>
                <select class="form-select" id="fieldType" required>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Dropdown</option>
                  <option value="textarea">Text Area</option>
                  <option value="file">File Upload</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Placeholder</label>
                <input type="text" class="form-control" id="fieldPlaceholder" placeholder="Placeholder text">
              </div>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="fieldRequired">
              <label class="form-check-label" for="fieldRequired">This field is required</label>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i class="ti ti-check me-1"></i>Add Field
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  {{-- Edit Field Modal --}}
  <div class="modal fade" id="editFieldModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-warning text-dark">
          <h5 class="modal-title"><i class="ti ti-edit me-2"></i>Edit Field</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="editFieldForm" onsubmit="updateField(event)">
          <input type="hidden" id="editFieldId">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Field Label <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="editFieldLabel" required>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Field Type <span class="text-danger">*</span></label>
                <select class="form-select" id="editFieldType" required>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Dropdown</option>
                  <option value="textarea">Text Area</option>
                  <option value="file">File Upload</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Placeholder</label>
                <input type="text" class="form-control" id="editFieldPlaceholder">
              </div>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="editFieldRequired">
              <label class="form-check-label" for="editFieldRequired">This field is required</label>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-warning">
              <i class="ti ti-check me-1"></i>Update Field
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  {{-- Add Category Modal --}}
  <div class="modal fade" id="addCategoryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title"><i class="ti ti-plus me-2"></i>Add New Category</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="addCategoryForm" onsubmit="saveCategory(event)">
          <div class="modal-body">
            <div class="mb-3">
              <label for="categoryName" class="form-label">Category Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="categoryName" required placeholder="e.g., Frontend Development">
            </div>
            <div class="mb-3">
              <label class="form-label">Subcategories <span class="text-danger">*</span></label>
              <div id="subcategoryInputs">
                <div class="input-group mb-2">
                  <input type="text" class="form-control subcategory-input" placeholder="e.g., React">
                  <button type="button" class="btn btn-outline-success" onclick="addSubcategoryInput()">
                    <i class="ti ti-plus"></i>
                  </button>
                </div>
              </div>
              <small class="text-muted">Add multiple subcategories for this category</small>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i class="ti ti-check me-1"></i>Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  {{-- Edit Category Modal --}}
  <div class="modal fade" id="editCategoryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-warning text-dark">
          <h5 class="modal-title"><i class="ti ti-edit me-2"></i>Edit Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="editCategoryForm" onsubmit="updateCategory(event)">
          <input type="hidden" id="editCategoryId">
          <div class="modal-body">
            <div class="mb-3">
              <label for="editCategoryName" class="form-label">Category Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="editCategoryName" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Subcategories <span class="text-danger">*</span></label>
              <div id="editSubcategoryInputs">
              </div>
              <button type="button" class="btn btn-sm btn-outline-success mt-2" onclick="addEditSubcategoryInput()">
                <i class="ti ti-plus me-1"></i>Add Subcategory
              </button>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-warning">
              <i class="ti ti-check me-1"></i>Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script>
    // Field Management
    function saveField(e) {
      e.preventDefault();
      const data = {
        step_number: document.getElementById('fieldStep').value,
        field_name: document.getElementById('fieldName').value,
        field_label: document.getElementById('fieldLabel').value,
        field_type: document.getElementById('fieldType').value,
        placeholder: document.getElementById('fieldPlaceholder').value,
        is_required: document.getElementById('fieldRequired').checked,
      };

      fetch('{{ route('admin.signup-config.field.store') }}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          location.reload();
        } else {
          alert('Error adding field');
        }
      });
    }

    function editField(field) {
      document.getElementById('editFieldId').value = field.id;
      document.getElementById('editFieldLabel').value = field.field_label;
      document.getElementById('editFieldType').value = field.field_type;
      document.getElementById('editFieldPlaceholder').value = field.placeholder || '';
      document.getElementById('editFieldRequired').checked = field.is_required;
      new bootstrap.Modal(document.getElementById('editFieldModal')).show();
    }

    function updateField(e) {
      e.preventDefault();
      const id = document.getElementById('editFieldId').value;
      const data = {
        field_label: document.getElementById('editFieldLabel').value,
        field_type: document.getElementById('editFieldType').value,
        placeholder: document.getElementById('editFieldPlaceholder').value,
        is_required: document.getElementById('editFieldRequired').checked,
      };

      fetch(`/admin/signup-config/field/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          location.reload();
        } else {
          alert('Error updating field');
        }
      });
    }

    function toggleFieldRequired(id, isRequired) {
      fetch(`/admin/signup-config/field/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ is_required: isRequired })
      });
    }

    function toggleFieldActive(id, isActive) {
      fetch(`/admin/signup-config/field/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ is_active: isActive })
      });
    }

    function deleteField(id) {
      if (!confirm('Are you sure you want to delete this field?')) return;
      fetch(`/admin/signup-config/field/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          location.reload();
        } else {
          alert('Error deleting field');
        }
      });
    }

    // Category Management
    function addSubcategoryInput() {
      const container = document.getElementById('subcategoryInputs');
      const div = document.createElement('div');
      div.className = 'input-group mb-2';
      div.innerHTML = `
        <input type="text" class="form-control subcategory-input" placeholder="e.g., Angular">
        <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">
          <i class="ti ti-trash"></i>
        </button>
      `;
      container.appendChild(div);
    }

    function addEditSubcategoryInput() {
      const container = document.getElementById('editSubcategoryInputs');
      const div = document.createElement('div');
      div.className = 'input-group mb-2';
      div.innerHTML = `
        <input type="text" class="form-control edit-subcategory-input" placeholder="Add subcategory">
        <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">
          <i class="ti ti-trash"></i>
        </button>
      `;
      container.appendChild(div);
    }

    function saveCategory(e) {
      e.preventDefault();
      const name = document.getElementById('categoryName').value.trim();
      const subcategories = [];
      document.querySelectorAll('.subcategory-input').forEach(input => {
        if (input.value.trim()) subcategories.push(input.value.trim());
      });

      if (!name || subcategories.length === 0) {
        alert('Please enter category name and at least one subcategory');
        return;
      }

      fetch('{{ route('admin.signup-config.category.store') }}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ category_name: name, subcategories })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          location.reload();
        } else {
          alert('Error saving category');
        }
      });
    }

    function editCategory(id, name, subcategories) {
      document.getElementById('editCategoryId').value = id;
      document.getElementById('editCategoryName').value = name;
      
      const container = document.getElementById('editSubcategoryInputs');
      container.innerHTML = '';
      
      (subcategories || []).forEach(sub => {
        const div = document.createElement('div');
        div.className = 'input-group mb-2';
        div.innerHTML = `
          <input type="text" class="form-control edit-subcategory-input" value="${sub}">
          <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">
            <i class="ti ti-trash"></i>
          </button>
        `;
        container.appendChild(div);
      });

      new bootstrap.Modal(document.getElementById('editCategoryModal')).show();
    }

    function updateCategory(e) {
      e.preventDefault();
      const id = document.getElementById('editCategoryId').value;
      const name = document.getElementById('editCategoryName').value.trim();
      const subcategories = [];
      document.querySelectorAll('.edit-subcategory-input').forEach(input => {
        if (input.value.trim()) subcategories.push(input.value.trim());
      });

      if (!name || subcategories.length === 0) {
        alert('Please enter category name and at least one subcategory');
        return;
      }

      fetch(`/admin/signup-config/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ category_name: name, subcategories })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          location.reload();
        } else {
          alert('Error updating category');
        }
      });
    }

    function deleteCategory(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;

      fetch(`/admin/signup-config/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          location.reload();
        } else {
          alert('Error deleting category');
        }
      });
    }
  </script>

  @endsection
</x-layout.layout>
