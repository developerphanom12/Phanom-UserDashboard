{{-- resources/views/admin/user-details.blade.php --}}
<x-layout.layout>
  <x-slot name="title">User Details</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      <div class="row">
        <div class="col-12">
          <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column mb-3">
            <div class="flex-grow-1">
              <h4 class="fs-18 text-uppercase fw-bold m-0">User Details & Progress</h4>
              <p class="text-muted mb-0 small">Real-time signup progress and test results</p>
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
                <i class="ti ti-users fs-4 text-primary"></i>
              </div>
              <h3 class="text-primary mb-1">{{ $userProgress->count() }}</h3>
              <p class="text-muted mb-0 small">Total Signups</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-user-check fs-4 text-success"></i>
              </div>
              <h3 class="text-success mb-1">{{ $userProgress->where('is_registered', true)->count() }}</h3>
              <p class="text-muted mb-0 small">Registered</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-clipboard-check fs-4 text-info"></i>
              </div>
              <h3 class="text-info mb-1">{{ $userProgress->whereNotNull('test_score')->count() }}</h3>
              <p class="text-muted mb-0 small">Tests Taken</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center py-4">
              <div class="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-2" style="width:50px;height:50px;">
                <i class="ti ti-trophy fs-4 text-warning"></i>
              </div>
              <h3 class="text-warning mb-1">{{ $userProgress->where('test_passed', true)->count() }}</h3>
              <p class="text-muted mb-0 small">Tests Passed</p>
            </div>
          </div>
        </div>
      </div>

      {{-- User Progress Table --}}
      <div class="card shadow-sm border-0">
        <div class="card-header bg-white border-bottom py-3">
          <h5 class="mb-0"><i class="ti ti-users me-2 text-primary"></i>All User Progress</h5>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4" style="min-width:200px;">Name / Email</th>
                  <th style="min-width:100px;">Phone</th>
                  <th style="min-width:120px;">Category</th>
                  <th style="min-width:100px;">Progress</th>
                  <th style="min-width:100px;">Status</th>
                  <th style="min-width:100px;">Test Score</th>
                <th style="min-width:120px;">Interview</th>
                  <th style="min-width:120px;">Last Updated</th>
                  <th class="text-center pe-4" style="width:100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                @forelse($userProgress as $progress)
                  <tr>
                    <td class="ps-4">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                          <span class="text-primary fw-semibold">{{ strtoupper(substr($progress->name ?? 'U', 0, 1)) }}</span>
                        </div>
                        <div>
                          <div class="fw-semibold text-dark">{{ $progress->name ?? 'Not provided' }}</div>
                          <div class="text-muted small">{{ $progress->email ?? 'No email' }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="text-muted">{{ $progress->phone ?? '-' }}</span>
                    </td>
                    <td>
                      @if($progress->category)
                        <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">{{ $progress->category }}</span>
                      @else
                        <span class="text-muted">-</span>
                      @endif
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <div class="progress flex-grow-1" style="height: 6px; width: 60px;">
                          <div class="progress-bar bg-success" style="width: {{ ($progress->current_step / 4) * 100 }}%"></div>
                        </div>
                        <span class="small text-muted">{{ $progress->current_step }}/4</span>
                      </div>
                    </td>
                    <td>
                      @if($progress->is_registered && $progress->is_paid)
                        <span class="badge bg-success px-2 py-1">Completed</span>
                      @elseif($progress->is_registered)
                        <span class="badge bg-info px-2 py-1">Registered</span>
                      @else
                        <span class="badge bg-warning text-dark px-2 py-1">In Progress</span>
                      @endif
                    </td>
                    <td>
                      @if($progress->test_score !== null)
                        <span class="fw-bold {{ $progress->test_passed ? 'text-success' : 'text-danger' }}">
                          {{ $progress->test_score }}%
                        </span>
                        @if($progress->test_passed)
                          <i class="ti ti-check text-success ms-1"></i>
                        @else
                          <i class="ti ti-x text-danger ms-1"></i>
                        @endif
                      @else
                        <span class="text-muted small">Not taken</span>
                      @endif
                    </td>
                    <td>
                      @if($progress->interview_status === 'completed')
                        <span class="fw-bold {{ ($progress->interview_score >= 70) ? 'text-success' : 'text-warning' }}">
                          {{ $progress->interview_score ?? '-' }}%
                        </span>
                        <i class="ti ti-check text-success ms-1"></i>
                      @elseif($progress->interview_status === 'scheduled')
                        <span class="badge bg-info">Scheduled</span>
                      @elseif($progress->interview_status === 'pending' && $progress->test_passed)
                        <span class="badge bg-warning text-dark">Awaiting</span>
                      @else
                        <span class="text-muted small">-</span>
                      @endif
                    </td>
                    <td>
                      <span class="text-muted small">{{ $progress->updated_at->diffForHumans() }}</span>
                    </td>
                    <td class="text-center pe-4">
                      <div class="btn-group btn-group-sm">
                        <button type="button" 
                                class="btn btn-outline-primary btn-sm" 
                                onclick="showUserDetails({{ $progress->id }})"
                                title="View Details">
                          <i class="ti ti-eye"></i>
                        </button>
                        <form action="{{ route('admin.user-details.destroy', $progress->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this record?')">
                          @csrf
                          @method('DELETE')
                          <button type="submit" class="btn btn-outline-danger btn-sm" title="Delete">
                            <i class="ti ti-trash"></i>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                @empty
                <tr>
                  <td colspan="9" class="text-center text-muted py-5">
                    <i class="ti ti-inbox fs-1 d-block mb-2 opacity-50"></i>
                    No user progress data yet.
                  </td>
                </tr>
                @endforelse
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
    <x-partials.footer />
  </div>

  {{-- Single Modal for All Details --}}
  <div class="modal fade" id="userDetailModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="ti ti-user me-2"></i>
            <span id="modalUserName">User Details</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4" id="modalContent">
          <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  {{-- Test Responses Modal --}}
  <div class="modal fade" id="testResponsesModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-info text-white">
          <h5 class="modal-title">
            <i class="ti ti-clipboard-list me-2"></i>
            Test Responses
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4" id="testResponsesContent">
          <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  {{-- User Data for JavaScript --}}
  <script>
    const userProgressData = @json($userProgress->keyBy('id'));
    
    // Helper functions for recommendation display
    function getRecommendationClass(recommendation) {
      if (!recommendation) return 'bg-secondary bg-opacity-10';
      const rec = recommendation.toLowerCase();
      if (rec.includes('recommend') && !rec.includes('not')) return 'bg-success bg-opacity-20 text-success';
      if (rec.includes('maybe') || rec.includes('consider')) return 'bg-warning bg-opacity-20 text-warning';
      return 'bg-danger bg-opacity-20 text-danger';
    }
    
    function getRecommendationIcon(recommendation) {
      if (!recommendation) return 'ti-help';
      const rec = recommendation.toLowerCase();
      if (rec.includes('recommend') && !rec.includes('not')) return 'ti-circle-check';
      if (rec.includes('maybe') || rec.includes('consider')) return 'ti-help-circle';
      return 'ti-circle-x';
    }
    
    function formatRecommendation(recommendation) {
      if (!recommendation) return 'No recommendation';
      // Handle different formats
      const rec = recommendation.toLowerCase();
      if (rec.includes('not') && rec.includes('recommend')) return 'Not Recommended';
      if (rec.includes('recommend') && !rec.includes('not')) return 'Recommended';
      if (rec.includes('maybe')) return 'Maybe / Further Review';
      return recommendation;
    }
    
    function showUserDetails(id) {
      const user = userProgressData[id];
      if (!user) return;
      
      document.getElementById('modalUserName').textContent = user.name || 'Unknown User';
      
      const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      };
      
      const formatDob = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      };
      
      const renderUploadedFiles = (uploads) => {
        if (!uploads || typeof uploads !== 'object') return '<p class="text-muted mb-0">No documents uploaded</p>';
        
        const fileLabels = {
          'portfolioUpload': 'Portfolio',
          'aadharUpload': 'Aadhar Card',
          'panUpload': 'PAN Card'
        };
        
        let html = '';
        for (const [key, value] of Object.entries(uploads)) {
          if (value) {
            const label = fileLabels[key] || key;
            const filename = typeof value === 'object' ? value.filename : value;
            const url = typeof value === 'object' ? value.url : null;
            
            html += `
              <div class="col-md-4">
                <div class="border rounded p-3 bg-white h-100">
                  <div class="d-flex align-items-start gap-3">
                    <div class="rounded bg-primary bg-opacity-10 p-2 flex-shrink-0">
                      <i class="ti ti-file-text text-primary fs-4"></i>
                    </div>
                    <div class="flex-grow-1" style="min-width: 0; overflow: hidden;">
                      <div class="fw-semibold small mb-1">${label}</div>
                      <div class="text-muted small text-truncate" style="max-width: 100%;" title="${filename}">${filename || 'Uploaded'}</div>
                      ${url ? `<a href="${url}" target="_blank" class="btn btn-sm btn-primary mt-2 w-100"><i class="ti ti-eye me-1"></i>View File</a>` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
        }
        
        return html || '<p class="text-muted mb-0">No documents uploaded</p>';
      };
      
      const content = `
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card bg-light border-0 h-100">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-user me-1"></i> Basic Information
                </h6>
                <table class="table table-sm table-borderless mb-0">
                  <tr><td class="text-muted" width="40%">Name</td><td class="fw-semibold">${user.name || '-'}</td></tr>
                  <tr><td class="text-muted">Email</td><td>${user.email || '-'}</td></tr>
                  <tr><td class="text-muted">Phone</td><td>${user.phone || '-'}</td></tr>
                  <tr><td class="text-muted">DOB</td><td>${formatDob(user.dob)}</td></tr>
                  <tr><td class="text-muted">Gender</td><td>${user.gender || '-'}</td></tr>
                  <tr><td class="text-muted">Location</td><td>${user.location || '-'}</td></tr>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-light border-0 h-100">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-briefcase me-1"></i> Professional Details
                </h6>
                <table class="table table-sm table-borderless mb-0">
                  <tr><td class="text-muted" width="40%">Category</td><td class="fw-semibold">${user.category || '-'}</td></tr>
                  <tr><td class="text-muted">Subcategory</td><td>${user.subcategory || '-'}</td></tr>
                  <tr><td class="text-muted">Experience</td><td>${user.experience || '-'}</td></tr>
                  <tr><td class="text-muted">Projects</td><td>${user.notable_projects || '-'}</td></tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        ${user.uploads ? `
        <div class="row g-4 mt-2">
          <div class="col-12">
            <div class="card bg-light border-0">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-file-upload me-1"></i> Uploaded Documents
                </h6>
                <div class="row g-3">
                  ${renderUploadedFiles(user.uploads)}
                </div>
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        <div class="row g-4 mt-2">
          <div class="col-md-6">
            <div class="card border-0 ${user.is_registered ? 'bg-success' : 'bg-warning'} bg-opacity-10 h-100">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-progress me-1"></i> Progress Status
                </h6>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-muted">Current Step</span>
                  <div class="d-flex align-items-center gap-2">
                    <div class="progress" style="width: 80px; height: 8px;">
                      <div class="progress-bar bg-success" style="width: ${(user.current_step / 4) * 100}%"></div>
                    </div>
                    <span class="fw-semibold">${user.current_step}/4</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-muted">Registered</span>
                  <span class="badge ${user.is_registered ? 'bg-success' : 'bg-secondary'}">${user.is_registered ? 'Yes' : 'No'}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted">Payment</span>
                  <span class="badge ${user.is_paid ? 'bg-success' : 'bg-secondary'}">${user.is_paid ? 'Paid' : 'Pending'}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 ${user.test_passed === true ? 'bg-success' : (user.test_passed === false ? 'bg-danger' : 'bg-secondary')} bg-opacity-10 h-100">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-clipboard-check me-1"></i> Test Results
                </h6>
                ${user.test_score !== null ? `
                  <div class="text-center">
                    <div class="display-4 fw-bold ${user.test_passed ? 'text-success' : 'text-danger'}">${user.test_score}%</div>
                    <span class="badge ${user.test_passed ? 'bg-success' : 'bg-danger'} px-3 py-2 mt-2">
                      ${user.test_passed ? '✓ Passed' : '✗ Failed'}
                    </span>
                    <div class="text-muted small mt-2">${user.correct_answers || 0}/${user.total_questions || 0} correct answers</div>
                    <div class="text-muted small">${user.test_completed_at ? 'Completed: ' + formatDate(user.test_completed_at) : ''}</div>
                    ${user.test_responses && user.test_responses.length > 0 ? `
                      <button onclick="showTestResponses(${user.id})" class="btn btn-sm btn-primary mt-3">
                        <i class="ti ti-eye me-1"></i>View Response
                      </button>
                    ` : ''}
                  </div>
                ` : `
                  <div class="text-center py-3">
                    <i class="ti ti-clipboard-x fs-1 text-muted opacity-50"></i>
                    <p class="text-muted mb-0 mt-2">Test not taken yet</p>
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
        
        ${user.interview_status && user.interview_status !== 'pending' ? `
        <div class="row g-4 mt-2">
          <div class="col-12">
            <div class="card border-0 ${user.interview_status === 'completed' ? 'bg-info' : 'bg-warning'} bg-opacity-10">
              <div class="card-body">
                <h6 class="text-uppercase text-muted small fw-bold mb-3">
                  <i class="ti ti-microphone me-1"></i> AI Interview Results
                </h6>
                <div class="row">
                  <div class="col-md-4 text-center border-end">
                    <div class="display-5 fw-bold ${user.interview_score >= 70 ? 'text-success' : 'text-warning'}">${user.interview_score || '-'}%</div>
                    <div class="text-muted small">Overall Score</div>
                    <span class="badge ${user.interview_status === 'completed' ? 'bg-success' : 'bg-warning'} mt-2">${user.interview_status}</span>
                  </div>
                  <div class="col-md-8">
                    <div class="mb-2"><strong>Summary:</strong></div>
                    <p class="text-muted small mb-2">${user.interview_summary || 'No summary available'}</p>
                    ${user.interview_duration_minutes ? `<div class="text-muted small"><i class="ti ti-clock me-1"></i>Duration: ${user.interview_duration_minutes} minutes</div>` : ''}
                    ${user.interview_completed_at ? `<div class="text-muted small"><i class="ti ti-calendar me-1"></i>Completed: ${formatDate(user.interview_completed_at)}</div>` : ''}
                  </div>
                </div>
                ${user.interview_feedback ? `
                  <hr class="my-3">
                  <h6 class="text-muted small fw-bold mb-2">Score Breakdown</h6>
                  <div class="row g-2 mb-3">
                    ${user.interview_feedback.technicalScore !== undefined ? `<div class="col-md-3"><div class="bg-white rounded p-2 text-center"><div class="fw-bold text-primary">${user.interview_feedback.technicalScore}%</div><small class="text-muted">Technical</small></div></div>` : ''}
                    ${user.interview_feedback.communicationScore !== undefined ? `<div class="col-md-3"><div class="bg-white rounded p-2 text-center"><div class="fw-bold text-info">${user.interview_feedback.communicationScore}%</div><small class="text-muted">Communication</small></div></div>` : ''}
                    ${user.interview_feedback.problemSolvingScore !== undefined ? `<div class="col-md-3"><div class="bg-white rounded p-2 text-center"><div class="fw-bold text-success">${user.interview_feedback.problemSolvingScore}%</div><small class="text-muted">Problem Solving</small></div></div>` : ''}
                    ${user.interview_feedback.experienceScore !== undefined ? `<div class="col-md-3"><div class="bg-white rounded p-2 text-center"><div class="fw-bold text-warning">${user.interview_feedback.experienceScore}%</div><small class="text-muted">Experience</small></div></div>` : ''}
                  </div>
                  
                  ${user.interview_feedback.strengths && user.interview_feedback.strengths.length > 0 ? `
                  <div class="mb-3">
                    <h6 class="text-muted small fw-bold mb-2"><i class="ti ti-thumb-up text-success me-1"></i>Strengths</h6>
                    <div class="d-flex flex-wrap gap-2">
                      ${user.interview_feedback.strengths.map(s => `<span class="badge bg-success bg-opacity-10 text-success px-3 py-2">${s}</span>`).join('')}
                    </div>
                  </div>
                  ` : ''}
                  
                  ${user.interview_feedback.areasToImprove && user.interview_feedback.areasToImprove.length > 0 ? `
                  <div class="mb-3">
                    <h6 class="text-muted small fw-bold mb-2"><i class="ti ti-alert-triangle text-warning me-1"></i>Areas to Improve</h6>
                    <div class="d-flex flex-wrap gap-2">
                      ${user.interview_feedback.areasToImprove.map(a => `<span class="badge bg-warning bg-opacity-10 text-warning px-3 py-2">${a}</span>`).join('')}
                    </div>
                  </div>
                  ` : ''}
                  
                  ${user.interview_feedback.recommendation ? `
                    <div class="mt-3 p-3 rounded ${getRecommendationClass(user.interview_feedback.recommendation)}">
                      <div class="d-flex align-items-center justify-content-center">
                        <i class="ti ${getRecommendationIcon(user.interview_feedback.recommendation)} fs-4 me-2"></i>
                        <span class="fw-bold">Recommendation: ${formatRecommendation(user.interview_feedback.recommendation)}</span>
                      </div>
                    </div>
                  ` : ''}
                ` : ''}
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        
        <div class="mt-4 pt-3 border-top">
          <small class="text-muted">
            <i class="ti ti-fingerprint me-1"></i> Session: ${user.session_id}<br>
            <i class="ti ti-calendar me-1"></i> Created: ${formatDate(user.created_at)} | Updated: ${formatDate(user.updated_at)}
          </small>
        </div>
      `;
      
      document.getElementById('modalContent').innerHTML = content;
      
      const modal = new bootstrap.Modal(document.getElementById('userDetailModal'));
      modal.show();
    }
    
    function showTestResponses(id) {
      const user = userProgressData[id];
      if (!user || !user.test_responses || user.test_responses.length === 0) {
        alert('No test responses available');
        return;
      }
      
      const responses = user.test_responses;
      
      let content = `
        <div class="mb-3 p-3 bg-light rounded">
          <div class="row">
            <div class="col-md-4 text-center">
              <div class="display-6 fw-bold ${user.test_passed ? 'text-success' : 'text-danger'}">${user.test_score}%</div>
              <small class="text-muted">Final Score</small>
            </div>
            <div class="col-md-4 text-center">
              <div class="display-6 fw-bold text-primary">${user.correct_answers || 0}/${user.total_questions || 0}</div>
              <small class="text-muted">Correct Answers</small>
            </div>
            <div class="col-md-4 text-center">
              <span class="badge ${user.test_passed ? 'bg-success' : 'bg-danger'} px-4 py-2">
                ${user.test_passed ? '✓ Passed' : '✗ Failed'}
              </span>
            </div>
          </div>
        </div>
      `;
      
      responses.forEach((resp, index) => {
        const questionNum = index + 1;
        const userAnswerLetter = resp.userAnswer !== null && resp.userAnswer !== undefined ? String.fromCharCode(65 + resp.userAnswer) : 'N/A';
        const correctAnswerLetter = String.fromCharCode(65 + resp.correctAnswer);
        const isCorrect = resp.isCorrect;
        
        content += `
          <div class="card mb-3 ${isCorrect ? 'border-success' : 'border-danger'} shadow-sm">
            <div class="card-header ${isCorrect ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><strong>Question ${questionNum}</strong></h6>
                ${isCorrect ? 
                  '<span class="badge bg-success"><i class="ti ti-check me-1"></i>Correct</span>' : 
                  '<span class="badge bg-danger"><i class="ti ti-x me-1"></i>Wrong</span>'
                }
              </div>
            </div>
            <div class="card-body">
              <p class="fw-semibold mb-3">${resp.question}</p>
              <div class="list-group">
        `;
        
        // Display all options
        resp.options.forEach((option, optIndex) => {
          const optionLetter = String.fromCharCode(65 + optIndex);
          const isUserAnswer = resp.userAnswer === optIndex;
          const isCorrectAnswer = resp.correctAnswer === optIndex;
          
          let classes = 'list-group-item';
          let icon = '';
          
          if (isCorrectAnswer) {
            classes += ' list-group-item-success';
            icon = '<i class="ti ti-check-circle text-success me-2"></i>';
          } else if (isUserAnswer && !isCorrectAnswer) {
            classes += ' list-group-item-danger';
            icon = '<i class="ti ti-x-circle text-danger me-2"></i>';
          }
          
          if (isUserAnswer) {
            classes += ' border-2';
          }
          
          content += `
            <div class="${classes}">
              <div class="d-flex align-items-center">
                ${icon}
                <strong class="me-2">${optionLetter})</strong>
                <span>${option}</span>
                ${isUserAnswer ? '<span class="badge bg-primary ms-auto">Your Answer</span>' : ''}
                ${isCorrectAnswer && !isUserAnswer ? '<span class="badge bg-success ms-auto">Correct Answer</span>' : ''}
              </div>
            </div>
          `;
        });
        
        content += `
              </div>
            </div>
          </div>
        `;
      });
      
      document.getElementById('testResponsesContent').innerHTML = content;
      
      const modal = new bootstrap.Modal(document.getElementById('testResponsesModal'));
      modal.show();
    }
  </script>

  <style>
    .avatar-sm {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }
    .table > :not(caption) > * > * {
      padding: 1rem 0.75rem;
    }
    .modal-content {
      border-radius: 12px;
      overflow: hidden;
    }
  </style>
  @endsection
</x-layout.layout>
