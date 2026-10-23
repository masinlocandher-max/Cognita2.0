import test from 'node:test'
import assert from 'node:assert/strict'
import { emptySample, normalizeSample, completedSteps, exportDraft } from '../src/lib/sample-classroom.js'
test('a new learner has no fabricated progress',()=>assert.equal(completedSteps(emptySample()),0))
test('untrusted stored values normalize without granting progress',()=>assert.deepEqual(normalizeSample({read:'true',checked:1,draft:{}}),emptySample()))
test('draft activity does not equal passed assessment',()=>{const s=normalizeSample({draft:'A'.repeat(40)});assert.equal(completedSteps(s),1);assert.equal(s.checked,false);assert.match(exportDraft(s),/Not submitted or assessed/)} )
test('large drafts are bounded and empty exports are explicit',()=>{assert.equal(normalizeSample({draft:'A'.repeat(13000)}).draft.length,12000);assert.match(exportDraft(emptySample()),/No draft yet/)} )
test('all three sample activities produce three recorded steps',()=>assert.equal(completedSteps({read:true,checked:true,draft:'A'.repeat(40)}),3))
