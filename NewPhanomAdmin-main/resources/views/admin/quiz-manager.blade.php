{{-- resources/views/admin/quiz-manager.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Quiz Manager</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      <div class="row">
        <div class="col-12">
          <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column mb-3">
            <div class="flex-grow-1">
              <h4 class="fs-18 text-uppercase fw-bold m-0"><i class="ti ti-file-text me-2"></i>Quiz Manager</h4>
              <p class="text-muted mb-0 small">Create and manage assessment quizzes</p>
            </div>
            <div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createQuizModal">
                <i class="ti ti-plus me-1"></i> Create Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {{-- Stats Cards --}}
      <div class="row mb-4 g-3">
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-file-text fs-4 text-primary"></i>
              </div>
              <h3 class="text-primary mb-1">{{ $quizzes->count() }}</h3>
              <p class="text-muted mb-0 small">Total Quizzes</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-eye fs-4 text-success"></i>
              </div>
              <h3 class="text-success mb-1">{{ $quizzes->where('is_published', true)->count() }}</h3>
              <p class="text-muted mb-0 small">Published</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-eye-off fs-4 text-warning"></i>
              </div>
              <h3 class="text-warning mb-1">{{ $quizzes->where('is_published', false)->count() }}</h3>
              <p class="text-muted mb-0 small">Drafts</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-help fs-4 text-info"></i>
              </div>
              <h3 class="text-info mb-1">{{ $quizzes->sum('total_questions') }}</h3>
              <p class="text-muted mb-0 small">Total Questions</p>
            </div>
          </div>
        </div>
      </div>

      {{-- Quiz Cards Grid --}}
      <div class="row g-4">
        @forelse($quizzes as $quiz)
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm h-100 overflow-hidden">
            <div class="card-header p-0">
              <div class="bg-gradient position-relative" style="height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                @if($quiz->header_image)
                  <img src="{{ $quiz->header_image }}" alt="{{ $quiz->title }}" class="w-100 h-100 object-fit-cover">
                @else
                  <div class="d-flex align-items-center justify-content-center h-100">
                    <i class="ti ti-file-text text-white" style="font-size: 3rem; opacity: 0.8;"></i>
                  </div>
                @endif
                <div class="position-absolute top-0 end-0 p-2">
                  <span class="badge {{ $quiz->is_published ? 'bg-success' : 'bg-secondary' }}">
                    {{ $quiz->is_published ? 'Published' : 'Draft' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title mb-2">{{ $quiz->title }}</h5>
              <p class="card-text text-muted small mb-3">{{ Str::limit($quiz->description, 80) ?: 'No description' }}</p>
              
              <div class="d-flex gap-3 text-muted small mb-3">
                <span><i class="ti ti-clock me-1"></i>{{ floor($quiz->total_duration / 60) }}m</span>
                <span><i class="ti ti-help me-1"></i>{{ $quiz->questions_count ?? $quiz->total_questions }} questions</span>
                <span><i class="ti ti-star me-1"></i>{{ $quiz->total_marks }} marks</span>
              </div>
            </div>
            <div class="card-footer bg-white border-top-0">
              <div class="d-flex gap-2">
                <a href="{{ route('admin.quiz.edit', $quiz->id) }}" class="btn btn-sm btn-outline-primary flex-fill">
                  <i class="ti ti-edit me-1"></i>Edit
                </a>
                <button type="button" class="btn btn-sm {{ $quiz->is_published ? 'btn-outline-warning' : 'btn-outline-success' }}" 
                        onclick="togglePublish({{ $quiz->id }})">
                  <i class="ti ti-{{ $quiz->is_published ? 'eye-off' : 'eye' }}"></i>
                </button>
                <form action="{{ route('admin.quiz.destroy', $quiz->id) }}" method="POST" class="d-inline" 
                      onsubmit="return confirm('Are you sure you want to delete this quiz?')">
                  @csrf
                  @method('DELETE')
                  <button type="submit" class="btn btn-sm btn-outline-danger">
                    <i class="ti ti-trash"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        @empty
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body text-center py-5">
              <i class="ti ti-file-text text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
              <h5 class="mt-3 text-muted">No Quizzes Yet</h5>
              <p class="text-muted mb-4">Create your first quiz to get started</p>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createQuizModal">
                <i class="ti ti-plus me-1"></i> Create First Quiz
              </button>
            </div>
          </div>
        </div>
        @endforelse
      </div>

    </div>
    <x-partials.footer />
  </div>

  {{-- Create Quiz Modal --}}
  <div class="modal fade" id="createQuizModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title"><i class="ti ti-plus me-2"></i>Create New Quiz</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="{{ route('admin.quiz.store') }}" method="POST">
          @csrf
          <div class="modal-body">
            <div class="mb-3">
              <label for="quizTitle" class="form-label">Quiz Title <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="quizTitle" name="title" required placeholder="Enter quiz title">
            </div>
            <div class="mb-3">
              <label for="quizDescription" class="form-label">Description</label>
              <textarea class="form-control" id="quizDescription" name="description" rows="3" placeholder="Enter quiz description"></textarea>
            </div>
            <div class="mb-3">
              <label for="quizCategory" class="form-label">Category</label>
              <select class="form-select" id="quizCategory" name="category">
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">Design</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i class="ti ti-plus me-1"></i>Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script>
    function togglePublish(quizId) {
      fetch(`/admin/quiz/${quizId}/toggle-publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          location.reload();
        }
      });
    }
  </script>

  @endsection
</x-layout.layout>

