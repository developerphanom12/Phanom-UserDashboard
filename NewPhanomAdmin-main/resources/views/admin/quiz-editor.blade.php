{{-- resources/views/admin/quiz-editor.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Quiz Editor - {{ $quiz->title }}</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      {{-- Header --}}
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <a href="{{ route('admin.quiz.index') }}" class="btn btn-outline-secondary btn-sm mb-2">
                <i class="ti ti-arrow-left me-1"></i>Back to Quizzes
              </a>
              <h4 class="fs-18 text-uppercase fw-bold m-0">Quiz Editor</h4>
              <p class="text-muted mb-0 small" id="quizStats">
                <span id="questionCount">{{ $quiz->questions->count() }}</span> questions • 
                <span id="totalMarks">{{ $quiz->total_marks }}</span> total marks
              </p>
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-outline-secondary" onclick="location.href='{{ route('admin.quiz.index') }}'">
                Cancel
              </button>
              <button type="button" class="btn btn-primary" id="saveQuizBtn" onclick="saveQuiz()">
                <i class="ti ti-device-floppy me-1"></i>Save Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {{-- Tabs --}}
      <ul class="nav nav-tabs mb-4" id="quizTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button">
            <i class="ti ti-settings me-1"></i>Settings
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions" type="button">
            <i class="ti ti-help me-1"></i>Questions (<span id="tabQuestionCount">{{ $quiz->questions->count() }}</span>)
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview" type="button">
            <i class="ti ti-eye me-1"></i>Preview
          </button>
        </li>
      </ul>

      {{-- Tab Content --}}
      <div class="tab-content" id="quizTabContent">
        
        {{-- Settings Tab --}}
        <div class="tab-pane fade show active" id="settings" role="tabpanel">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3">
                    <label for="quizTitle" class="form-label">Quiz Title <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="quizTitle" value="{{ $quiz->title }}" required>
                  </div>
                  <div class="mb-3">
                    <label for="quizDescription" class="form-label">Description</label>
                    <textarea class="form-control" id="quizDescription" rows="4">{{ $quiz->description }}</textarea>
                  </div>
                  <div class="mb-3">
                    <label for="quizCategory" class="form-label">Category</label>
                    <select class="form-select" id="quizCategory">
                      <option value="">Select Category</option>
                      <option value="Frontend" {{ $quiz->category == 'Frontend' ? 'selected' : '' }}>Frontend</option>
                      <option value="Backend" {{ $quiz->category == 'Backend' ? 'selected' : '' }}>Backend</option>
                      <option value="Mobile" {{ $quiz->category == 'Mobile' ? 'selected' : '' }}>Mobile Development</option>
                      <option value="DevOps" {{ $quiz->category == 'DevOps' ? 'selected' : '' }}>DevOps</option>
                      <option value="Design" {{ $quiz->category == 'Design' ? 'selected' : '' }}>Design</option>
                      <option value="General" {{ $quiz->category == 'General' ? 'selected' : '' }}>General</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Header Image</label>
                  <div class="border rounded p-3 text-center" style="min-height: 150px;">
                    <div id="headerImagePreview">
                      @if($quiz->header_image)
                        <img src="{{ $quiz->header_image }}" class="img-fluid rounded mb-2" style="max-height: 120px;">
                      @else
                        <i class="ti ti-photo text-muted" style="font-size: 3rem;"></i>
                        <p class="text-muted small mb-0">No header image</p>
                      @endif
                    </div>
                    <input type="text" class="form-control form-control-sm mt-2" id="headerImageUrl" 
                           placeholder="Enter image URL" value="{{ $quiz->header_image }}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {{-- Questions Tab --}}
        <div class="tab-pane fade" id="questions" role="tabpanel">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Questions</h5>
            <button type="button" class="btn btn-primary" onclick="addQuestion()">
              <i class="ti ti-plus me-1"></i>Add Question
            </button>
          </div>

          <div id="questionsContainer">
            @forelse($quiz->questions as $index => $question)
            <div class="card border-0 shadow-sm mb-4 question-card" data-question-id="{{ $question->id }}">
              <div class="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 class="mb-0">Question {{ $index + 1 }}</h6>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeQuestion(this)">
                  <i class="ti ti-trash"></i>
                </button>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label class="form-label">Question Text</label>
                  <textarea class="form-control question-text" rows="3">{{ $question->question_text }}</textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Options</label>
                  <div class="row g-3">
                    @foreach($question->options as $optIndex => $option)
                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-text">
                          <input type="radio" name="correct_{{ $question->id }}" 
                                 class="form-check-input mt-0 option-correct" 
                                 {{ $option->is_correct ? 'checked' : '' }}
                                 data-option-index="{{ $optIndex }}">
                        </div>
                        <input type="text" class="form-control option-text" 
                               placeholder="Option {{ $optIndex + 1 }}" 
                               value="{{ $option->text }}"
                               data-option-id="{{ $option->id }}">
                        <span class="input-group-text">{{ chr(65 + $optIndex) }}</span>
                      </div>
                    </div>
                    @endforeach
                  </div>
                  <small class="text-muted">Select the radio button to mark the correct answer</small>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label class="form-label">Marks</label>
                    <input type="number" class="form-control question-marks" min="1" value="{{ $question->marks }}">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Negative Marks</label>
                    <input type="number" class="form-control question-negative" min="0" step="0.5" value="{{ $question->negative_marks }}">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Time (seconds)</label>
                    <input type="number" class="form-control question-time" min="10" value="{{ $question->time_to_solve }}">
                  </div>
                </div>
              </div>
            </div>
            @empty
            <div class="text-center py-5" id="noQuestionsPlaceholder">
              <i class="ti ti-help text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
              <h5 class="mt-3 text-muted">No Questions Yet</h5>
              <p class="text-muted">Click "Add Question" to create your first question</p>
            </div>
            @endforelse
          </div>
        </div>

        {{-- Preview Tab --}}
        <div class="tab-pane fade" id="preview" role="tabpanel">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div id="previewContent">
                <p class="text-muted text-center py-4">Save the quiz first to see preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <x-partials.footer />
  </div>

  <script>
    const quizId = {{ $quiz->id }};
    let questionCounter = {{ $quiz->questions->count() }};

    function addQuestion() {
      questionCounter++;
      document.getElementById('noQuestionsPlaceholder')?.remove();
      
      const container = document.getElementById('questionsContainer');
      const questionHtml = `
        <div class="card border-0 shadow-sm mb-4 question-card" data-question-id="new_${questionCounter}">
          <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Question ${questionCounter}</h6>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeQuestion(this)">
              <i class="ti ti-trash"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Question Text</label>
              <textarea class="form-control question-text" rows="3" placeholder="Enter your question here..."></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Options</label>
              <div class="row g-3">
                ${[0,1,2,3].map(i => `
                <div class="col-md-6">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input type="radio" name="correct_new_${questionCounter}" 
                             class="form-check-input mt-0 option-correct" 
                             data-option-index="${i}"
                             ${i === 0 ? 'checked' : ''}>
                    </div>
                    <input type="text" class="form-control option-text" 
                           placeholder="Option ${i + 1}">
                    <span class="input-group-text">${String.fromCharCode(65 + i)}</span>
                  </div>
                </div>
                `).join('')}
              </div>
              <small class="text-muted">Select the radio button to mark the correct answer</small>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label class="form-label">Marks</label>
                <input type="number" class="form-control question-marks" min="1" value="1">
              </div>
              <div class="col-md-4">
                <label class="form-label">Negative Marks</label>
                <input type="number" class="form-control question-negative" min="0" step="0.5" value="0">
              </div>
              <div class="col-md-4">
                <label class="form-label">Time (seconds)</label>
                <input type="number" class="form-control question-time" min="10" value="60">
              </div>
            </div>
          </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', questionHtml);
      updateQuestionNumbers();
      updateStats();
    }

    function removeQuestion(btn) {
      if (confirm('Are you sure you want to remove this question?')) {
        btn.closest('.question-card').remove();
        updateQuestionNumbers();
        updateStats();
        
        if (document.querySelectorAll('.question-card').length === 0) {
          document.getElementById('questionsContainer').innerHTML = `
            <div class="text-center py-5" id="noQuestionsPlaceholder">
              <i class="ti ti-help text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
              <h5 class="mt-3 text-muted">No Questions Yet</h5>
              <p class="text-muted">Click "Add Question" to create your first question</p>
            </div>
          `;
        }
      }
    }

    function updateQuestionNumbers() {
      document.querySelectorAll('.question-card').forEach((card, index) => {
        card.querySelector('.card-header h6').textContent = `Question ${index + 1}`;
      });
    }

    function updateStats() {
      const questions = document.querySelectorAll('.question-card');
      let totalMarks = 0;
      questions.forEach(q => {
        totalMarks += parseInt(q.querySelector('.question-marks')?.value || 0);
      });
      
      document.getElementById('questionCount').textContent = questions.length;
      document.getElementById('tabQuestionCount').textContent = questions.length;
      document.getElementById('totalMarks').textContent = totalMarks;
    }

    function collectQuizData() {
      const questions = [];
      document.querySelectorAll('.question-card').forEach(card => {
        const options = [];
        card.querySelectorAll('.option-text').forEach((input, idx) => {
          options.push({
            text: input.value,
            is_correct: card.querySelectorAll('.option-correct')[idx]?.checked || false,
          });
        });

        questions.push({
          question_text: card.querySelector('.question-text').value,
          marks: parseInt(card.querySelector('.question-marks').value) || 1,
          negative_marks: parseFloat(card.querySelector('.question-negative').value) || 0,
          time_to_solve: parseInt(card.querySelector('.question-time').value) || 60,
          options: options,
        });
      });

      return {
        title: document.getElementById('quizTitle').value,
        description: document.getElementById('quizDescription').value,
        header_image: document.getElementById('headerImageUrl').value,
        category: document.getElementById('quizCategory').value,
        questions: questions,
      };
    }

    function saveQuiz() {
      const btn = document.getElementById('saveQuizBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Saving...';
      btn.disabled = true;

      const data = collectQuizData();

      fetch(`/admin/quiz/${quizId}/save`, {
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
          alert('Quiz saved successfully!');
          location.reload();
        } else {
          alert('Error saving quiz: ' + (result.message || 'Unknown error'));
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error saving quiz');
      })
      .finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
    }

    // Update preview when switching to preview tab
    document.getElementById('preview-tab').addEventListener('click', function() {
      const data = collectQuizData();
      let previewHtml = `
        <div class="mb-4">
          <h3>${data.title || 'Untitled Quiz'}</h3>
          <p class="text-muted">${data.description || 'No description'}</p>
          <div class="d-flex gap-3 text-muted small">
            <span><i class="ti ti-help me-1"></i>${data.questions.length} questions</span>
            <span><i class="ti ti-star me-1"></i>${data.questions.reduce((sum, q) => sum + q.marks, 0)} marks</span>
          </div>
        </div>
        <hr>
      `;

      data.questions.forEach((q, idx) => {
        previewHtml += `
          <div class="mb-4">
            <h6>Question ${idx + 1}</h6>
            <p>${q.question_text || '<em>No question text</em>'}</p>
            <div class="row g-2">
              ${q.options.map((opt, i) => `
                <div class="col-md-6">
                  <div class="p-2 border rounded ${opt.is_correct ? 'bg-success bg-opacity-10 border-success' : ''}">
                    <strong>${String.fromCharCode(65 + i)}.</strong> ${opt.text || '<em>Empty</em>'}
                    ${opt.is_correct ? '<i class="ti ti-check text-success float-end"></i>' : ''}
                  </div>
                </div>
              `).join('')}
            </div>
            <small class="text-muted">${q.marks} marks • ${q.time_to_solve}s</small>
          </div>
        `;
      });

      document.getElementById('previewContent').innerHTML = previewHtml || '<p class="text-muted">No questions to preview</p>';
    });

    // Listen for mark changes to update stats
    document.addEventListener('input', function(e) {
      if (e.target.classList.contains('question-marks')) {
        updateStats();
      }
    });
  </script>

  @endsection
</x-layout.layout>

