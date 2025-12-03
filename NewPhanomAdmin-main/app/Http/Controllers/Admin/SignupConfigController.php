<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SignupFormConfig;
use App\Models\CategorySubcategory;
use Illuminate\Http\Request;

class SignupConfigController extends Controller
{
    /**
     * Display the signup config page
     */
    public function index()
    {
        $formFields = SignupFormConfig::orderBy('step_number')
            ->orderBy('sort_order')
            ->get();
            
        $categories = CategorySubcategory::where('is_active', true)
            ->orderBy('category_name')
            ->get();
            
        return view('admin.signup-config', compact('formFields', 'categories'));
    }

    /**
     * Store a new form field
     */
    public function storeField(Request $request)
    {
        $request->validate([
            'step_number' => 'required|integer|min:1|max:4',
            'field_name' => 'required|string|max:50',
            'field_label' => 'required|string|max:100',
            'field_type' => 'required|string',
        ]);

        $maxOrder = SignupFormConfig::where('step_number', $request->step_number)
            ->max('sort_order') ?? 0;

        $field = SignupFormConfig::create([
            'step_number' => $request->step_number,
            'field_name' => $request->field_name,
            'field_label' => $request->field_label,
            'field_type' => $request->field_type,
            'is_required' => $request->is_required ?? false,
            'placeholder' => $request->placeholder,
            'options' => $request->options,
            'sort_order' => $maxOrder + 1,
            'is_active' => true,
        ]);

        return response()->json(['ok' => true, 'field' => $field]);
    }

    /**
     * Update a form field
     */
    public function updateField(Request $request, $id)
    {
        $field = SignupFormConfig::findOrFail($id);
        
        $field->update($request->only([
            'field_label',
            'field_type',
            'is_required',
            'placeholder',
            'options',
            'is_active',
        ]));

        return response()->json(['ok' => true, 'field' => $field]);
    }

    /**
     * Delete a form field
     */
    public function deleteField($id)
    {
        $field = SignupFormConfig::findOrFail($id);
        $field->delete();

        return response()->json(['ok' => true]);
    }

    /**
     * Reorder fields
     */
    public function reorderFields(Request $request)
    {
        foreach ($request->fields as $index => $fieldId) {
            SignupFormConfig::where('id', $fieldId)->update(['sort_order' => $index]);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Store a new category
     */
    public function storeCategory(Request $request)
    {
        $request->validate([
            'category_name' => 'required|string|max:100|unique:category_subcategory,category_name',
            'subcategories' => 'required|array',
        ]);

        $category = CategorySubcategory::create([
            'category_name' => $request->category_name,
            'subcategories' => $request->subcategories,
            'is_active' => true,
        ]);

        return response()->json(['ok' => true, 'category' => $category]);
    }

    /**
     * Update a category
     */
    public function updateCategory(Request $request, $id)
    {
        $category = CategorySubcategory::findOrFail($id);
        
        $category->update([
            'category_name' => $request->category_name,
            'subcategories' => $request->subcategories,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json(['ok' => true, 'category' => $category]);
    }

    /**
     * Delete a category
     */
    public function deleteCategory($id)
    {
        $category = CategorySubcategory::findOrFail($id);
        $category->delete();

        return response()->json(['ok' => true]);
    }
}

